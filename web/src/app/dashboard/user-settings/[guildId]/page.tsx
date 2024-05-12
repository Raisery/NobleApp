import { getServerSession } from 'next-auth'
import prisma from '@/lib/prisma'
import { redirect } from 'next/navigation'
import PrimaryLinkButton from '@/ui/layout/PrimaryLinkButton'
import AddUserEventForm from '@/ui/layout/forms/AddUserEventForm'
import { authConfig } from '@/app/api/auth/[...nextauth]/route'

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
		<div className='flex flex-col items-center'>
			<h2
				className={
					' text-4xl text-white/50 border-4 border-t-0 p-4 rounded-b-md border-white/20 mb-4'
				}
			>
				{user.name}
			</h2>
			<div className='flex flex-col items-center w-full gap-4'>
				<div className='flex flex-col w-2/3 items-center'>
					<AddUserEventForm
						userId={user.id}
						guildId={guildId}
						availableSongs={availableSongs}
						userEvents={user.voiceEvents}
					/>
				</div>
				<div className=' h-10'>
					<PrimaryLinkButton href={'/dashboard/add-song/' + guildId}>
						Ajouter un son
					</PrimaryLinkButton>
				</div>
			</div>
		</div>
	)
}
