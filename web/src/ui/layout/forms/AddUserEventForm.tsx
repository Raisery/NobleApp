'use client'
import { createSong } from '@/lib/formActions/createSong'
import { FormEvent, useState } from 'react'
import { useFormState } from 'react-dom'
import SongSelector from './SongSelector'
import { EventType } from '@/lib/definition'
import { createUserEvent } from '@/lib/formActions/createUserEvent'

const initalState = {
	message: '',
}

export default function AddUserEventForm({
	userId,
	guildId,
	availableSongs,
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
}) {
	const [state, formAction] = useFormState(createUserEvent, initalState)

	return (
		<form action={formAction} className='flex flex-col p-4'>
			<input type='text' name='userId' value={userId} className='hidden' readOnly />
			<input type='text' name='guildId' value={guildId} className='hidden' readOnly />
			<SongSelector
				songs={availableSongs}
				event={EventType.CONNECTION}
				label='Son de connexion :'
			/>
			<SongSelector
				songs={availableSongs}
				event={EventType.DECONNECTION}
				label='Son de deconnexion :'
			/>
			<SongSelector
				songs={availableSongs}
				event={EventType.OPEN_STREAM}
				label="Son d'ouverture de stream :"
			/>
			<SongSelector
				songs={availableSongs}
				event={EventType.CLOSE_STREAM}
				label='Son de fermeture de stream :'
			/>
			{state.message}
			<button type='submit'>Enregistrer</button>
		</form>
	)
}
