import prisma from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authConfig } from '../../../../../pages/api/auth/[...nextauth]'
import GuildSettingsPreview from '@/ui/guild/GuildSettingPreview'

export default async function GuildSettings({ params }: { params: { guildId: string } }) {
	const { guildId } = params
	const session = await getServerSession(authConfig)
	const guild = await prisma.guild.findUnique({
		where: { id: guildId },
	})
	if (!session) return redirect('/')
	if (!guild) return redirect('/dashboard')
	if (guild.ownerId !== session.user.discordId) return redirect('/petit-coquin')

	return (
		<div className='h-full w-full'>
			<GuildSettingsPreview guildId={guildId} isOwner={false} />
		</div>
	)
}
