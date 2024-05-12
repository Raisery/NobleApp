'use client'
import { useFormState } from 'react-dom'
import SongSelector from './SongSelector'
import { EventType } from '@/lib/definition'
import { createUserEvent } from '@/lib/formActions/createUserEvent'
import { redirect, useRouter } from 'next/navigation'

const initalState = {
	message: '',
	status: 'NOK',
}

export default function AddUserEventForm({
	userId,
	guildId,
	availableSongs,
	userEvents,
}: {
	userId: string
	guildId: string
	availableSongs: {
		id: number
		title: string
		duration: Date
		artist: string
		authorId: string
		guildId: string
	}[]
	userEvents: {
		id: number
		type: string
		userId: string
		songId: number
		guildId: string
		isActive: boolean
	}[]
}) {
	const [state, formAction] = useFormState(createUserEvent, initalState)
	if (state.status === 'OK') redirect('/dashboard/' + guildId)
	return (
		<form
			action={formAction}
			className='flex flex-col p-4 w-full gap-4 border-4 rounded-md border-white/30'
		>
			<input type='text' name='userId' value={userId} className='hidden' readOnly />
			<input type='text' name='guildId' value={guildId} className='hidden' readOnly />
			<SongSelector
				selected={userEvents.find(event => event.type === EventType.CONNECTION)?.songId}
				songs={availableSongs}
				event={EventType.CONNECTION}
				label='Son de connexion :'
			/>
			<SongSelector
				selected={userEvents.find(event => event.type === EventType.DECONNECTION)?.songId}
				songs={availableSongs}
				event={EventType.DECONNECTION}
				label='Son de deconnexion :'
			/>
			<SongSelector
				selected={userEvents.find(event => event.type === EventType.OPEN_STREAM)?.songId}
				songs={availableSongs}
				event={EventType.OPEN_STREAM}
				label="Son d'ouverture de stream :"
			/>
			<SongSelector
				selected={userEvents.find(event => event.type === EventType.CLOSE_STREAM)?.songId}
				songs={availableSongs}
				event={EventType.CLOSE_STREAM}
				label='Son de fermeture de stream :'
			/>
			{state.message}
			<button
				type='submit'
				className='border-4 rounded-md border-white/30 hover:border-secondary/30 hover:text-secondary/30'
			>
				Enregistrer
			</button>
		</form>
	)
}
