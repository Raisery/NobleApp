import prisma from '@/lib/prisma'
import GuildSettingsPreview from '@/ui/guild/GuildSettingPreview'
import UserSettingsPreview from '@/ui/user/UserSettingsPreview'
import { getServerSession } from 'next-auth'
import { authConfig } from '../../../../pages/api/auth/[...nextauth]'
import { redirect } from 'next/navigation'
import { Suspense } from 'react'
import Loading from '@/ui/loading/loading'

export default async function GuildPreview({ params }: { params: { guildId: string } }) {
	const session = await getServerSession(authConfig)
	const guildId = params.guildId

	const guild = await prisma.guild.findUnique({
		where: { id: guildId },
	})
	if (!session) redirect('/')
	if (!guild) return <div>{"ERROR : CAN'T RETRIEVE GUILD IN DATABASE"}</div>

	return (
		<div className='flex gap-4 w-full h-full'>
			<div className='w-full h-full bg-black/10 rounded-md'>
				<div className='flex flex-col h-full w-full items-center'>
					<h2
						className={
							' text-4xl text-white/50 border-4 border-t-0 p-4 rounded-b-md border-white/20'
						}
					>
						{guild.name}
					</h2>
					<div className='w-full h-full flex flex-col items-center justify-around '>
						<Suspense fallback={<Loading />}>
							<GuildSettingsPreview
								guildId={guildId}
								isOwner={guild.ownerId === session.user.discordId}
							/>
						</Suspense>
						<Suspense fallback={<Loading />}>
							<UserSettingsPreview
								userId={session.user.discordId}
								guildId={guildId}
							/>
						</Suspense>
					</div>
				</div>
			</div>
		</div>
	)
}
