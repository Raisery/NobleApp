import prisma from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import GuildTile from '@/ui/guild/GuildTile'
import { Suspense } from 'react'
import Loading from '../../ui/loading/loading'
import { Guild } from 'discord.js'
import { fetchDiscordUserGuilds } from '@/lib/fetchDiscordAPI'
import PrimaryLinkButton from '@/ui/layout/PrimaryLinkButton'
import { authConfig } from '../api/auth/[...nextauth]/route'
const invitationLink = process.env.INVITATION_LINK as string

export default async function DashboardLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	const session = await getServerSession(authConfig)
	if (!session) redirect('/connection-required')
	const user = await prisma.nobleUser.findUnique({
		where: {
			id: session.user.discordId,
		},
		include: {
			guilds: true,
		},
	})

	if (!user) return 'Reset logging please'
	if (!user.guilds[0])
		return (
			<div className='flex flex-col items-center justify-center h-full overflow-y-auto'>
				<div>
					<p>None of your discord server are connected with bots</p>
					<PrimaryLinkButton target='_blank' href={invitationLink}>
						Invite bot
					</PrimaryLinkButton>
				</div>
			</div>
		)

	const Guilds = [] as React.ReactNode[]

	const discordUserGuilds = await fetchDiscordUserGuilds()
	if (!discordUserGuilds) {
		Guilds.push(<div>No Guilds found</div>)
	} else {
		for (const advertGuild of user.guilds) {
			const guild = discordUserGuilds.find(g => g.id === advertGuild.id) as Guild
			Guilds.push(
				<Suspense fallback={<Loading />} key={advertGuild.id}>
					<GuildTile guild={guild} />
				</Suspense>
			)
		}
	}

	return (
		<div className='w-ful h-full  p-6 flex gap-4' id='dashboard-layout'>
			<>
				<div className='w-1/3 bg-black/30 rounded-md p-2 overflow-hidden'>
					<div className='h-full min-h-screen overflow-y-auto overflow-x-hidden p-8 flex flex-col gap-3'>
						{Guilds}
					</div>
				</div>

				<div className='w-2/3 h-full overflow-hidden bg-black/30 rounded-md p-4'>
					<div className='w-full h-full bg-black/10 pb-4 rounded-md overflow-y-auto overflow-x-hidden'>
						<Suspense fallback={<Loading />}>{children}</Suspense>
					</div>
				</div>
			</>
		</div>
	)
}
