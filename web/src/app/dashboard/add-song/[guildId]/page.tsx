import prisma from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import AddSongForm from '@/ui/layout/forms/AddSongForm'
import { authConfig } from '@/app/api/auth/[...nextauth]/route'
const storage = process.env.STORAGE_FOLDER

export default async function AddSong({ params }: { params: { guildId: string } }) {
	const session = await getServerSession(authConfig)
	const { guildId } = params
	const guild = await prisma.guild.findUnique({
		where: { id: guildId },
	})

	if (!guild) redirect('/dashboard')

	return (
		<div className='h-full w-full flex flex-col bg-black/10 rounded-md items-center gap-20'>
			<h2
				className={
					' text-4xl text-white/50 border-4 border-t-0 p-4 rounded-b-md border-white/20'
				}
			>
				{guild?.name}
			</h2>
			<AddSongForm userId={session?.user.discordId as string} guildId={guildId} />
		</div>
	)
}
