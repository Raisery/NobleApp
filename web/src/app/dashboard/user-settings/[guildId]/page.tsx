import { getServerSession } from 'next-auth'
import { authConfig } from '../../../../../pages/api/auth/[...nextauth]'
import prisma from '@/lib/prisma'
import { redirect } from 'next/navigation'
import SongSelector from '@/ui/layout/forms/SongSelector'
import { EventType } from '@/lib/definition'
import PrimaryLinkButton from '@/ui/layout/PrimaryLinkButton'
import AddUserEventForm from '@/ui/layout/forms/AddUserEventForm'

export default async function UserSettings({ params }: { params: { guildId: string } }) {
	const { guildId } = params
	const session = await getServerSession(authConfig)
	const user = await prisma.nobleUser.findUnique({
		where: { id: session?.user.discordId },
		include: { voiceEvents: true },
	})
	const availableSongs = await prisma.song.findMany({
		where: {
			guildId: guildId,
		},
	})

	if (!session) return redirect('/')
	if (!user) return redirect('/dashboard')
	if (availableSongs.length === 0)
		return (
			<div className='flex flex-col h-full gap-5 justify-center items-center'>
				<h2 className='text-4xl'>Pas de sons disponibles sur ce serveur.</h2>
				<p className='text-2xl'>Ajoutes en !</p>
				<div className='h-10'>
					<PrimaryLinkButton href={'/dashboard/add-song/' + guildId}>
						Ajouter un son
					</PrimaryLinkButton>
				</div>
			</div>
		)
	return (
		<div className='h-full w-full flex flex-col justify-around'>
			<div>
				<h2>{user.name}</h2>
			</div>
			<div>
				<AddUserEventForm
					userId={user.id}
					guildId={guildId}
					availableSongs={availableSongs}
				/>
			</div>
			<div className=' h-10'>
				<PrimaryLinkButton href={'/dashboard/add-song/' + guildId}>
					Ajouter un son
				</PrimaryLinkButton>
			</div>
		</div>
	)
}
