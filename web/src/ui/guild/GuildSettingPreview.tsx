import { EventType } from '@/lib/definition'
import prisma from '@/lib/prisma'
import PrimaryLinkButton from '../layout/PrimaryLinkButton'

export default async function GuildSettingsPreview({
	guildId,
	isOwner,
}: {
	guildId: string
	isOwner: boolean
}) {
	const guildEvents = await prisma.guildVoiceEvent.findMany({
		where: {
			guildId: guildId,
		},
		include: {
			song: true,
		},
	})
	const openStream = guildEvents.find(event => event.type === EventType.OPEN_STREAM)
	const closeStream = guildEvents.find(event => event.type === EventType.CLOSE_STREAM)
	const onConnection = guildEvents.find(event => event.type === EventType.CONNECTION)
	const onDeconnection = guildEvents.find(event => event.type === EventType.DECONNECTION)
	return (
		<div
			className={
				' w-5/6 flex flex-col gap-3 p-4 px-8 border-white/20 border-4 rounded-lg text-2xl items-center'
			}
		>
			<h3 className='text-4xl w-full text-center'>Paramètres serveur</h3>
			<div className='flex justify-between w-full'>
				<p>Son de début de stream : </p>
				<div>{openStream ? openStream.songId : 'AUCUN'}</div>
			</div>
			<div className='flex justify-between w-full'>
				<p>Son de fin de stream : </p>
				<div>{closeStream ? closeStream.songId : 'AUCUN'}</div>
			</div>
			<div className='flex justify-between w-full'>
				<p>Son de connexion : </p>
				<div>{onConnection ? onConnection.songId : 'AUCUN'}</div>
			</div>
			<div className='flex justify-between w-full'>
				<p>Son de deconnexion : </p>
				<div>{onDeconnection ? onDeconnection.songId : 'AUCUN'}</div>
			</div>
			{isOwner ? (
				<div className=' h-10 w-2/5'>
					<PrimaryLinkButton href={'/dashboard/guild-settings/' + guildId}>
						Modifier
					</PrimaryLinkButton>
				</div>
			) : (
				''
			)}
		</div>
	)
}
