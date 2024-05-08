import prisma from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authConfig } from '../../../pages/api/auth/[...nextauth]'
import GuildTile from '@/ui/guild/GuildTile'
import { Suspense } from 'react'
import Loading from '../../ui/loading/loading'
import { Guild } from 'discord.js'
import { fetchDiscordUserGuilds } from '@/lib/fetchDiscordAPI'
import PrimaryLinkButton from '@/ui/layout/PrimaryLinkButton'

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
			<div className='flex flex-col items-center justify-center h-full'>
				<div>
					<p>None of your discord server are connected with bots</p>
					<PrimaryLinkButton
						target='_blank'
						href='https://discord.com/oauth2/authorize?client_id=1230499719172591696&permissions=8&scope=bot'
					>
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
				<div className='w-1/3 bg-white/30 rounded-md p-2 overflow-hidden'>
					<div className='h-full min-h-screen overflow-y-auto overflow-x-hidden p-8 flex flex-col gap-3'>
						{Guilds}
					</div>
				</div>

				<div className='w-2/3 bg-white/30 rounded-md p-4 overflow-hidden '>
					<Suspense fallback={<Loading />}>{children}</Suspense>
				</div>
			</>
		</div>
	)
}
