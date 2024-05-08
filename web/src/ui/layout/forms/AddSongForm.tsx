'use client'
import { createSong } from '@/lib/formActions/createSong'
import { FormEvent, useState } from 'react'
import { useFormState } from 'react-dom'

const initalState = {
	message: '',
}

export default function AddSongForm({
	userId,
	guildId,
	limit = 0,
}: {
	userId: string
	guildId: string
	limit?: number
}) {
	const [duration, setDuration] = useState(0)
	const [state, formAction] = useFormState(createSong, initalState)

	function handleSong(event: FormEvent<HTMLInputElement>) {
		const fileList = event.currentTarget.files
		if (!fileList) return
		const song = fileList[0]
		const ctx = new AudioContext()
		console.log('file detected')
		song.arrayBuffer().then(fileBuffer => {
			ctx.decodeAudioData(fileBuffer).then(decodedAudio => {
				setDuration(decodedAudio.duration)
			})
		})
	}

	return (
		<form
			action={formAction}
			className=' flex flex-col border-4 border-white/30 rounded-lg w-2/3 p-4 gap-10'
		>
			<input type='text' name='userId' value={userId} className='hidden' readOnly />
			<input type='text' name='guildId' value={guildId} className='hidden' readOnly />
			<input type='number' name='duration' value={duration} className='hidden' readOnly />
			<div className='flex flex-col gap-4'>
				<label htmlFor='title'>Titre :</label>
				<input type='text' name='title' id='title' className='text-black p-2 rounded-md' />
			</div>

			<div className='flex flex-col gap-4'>
				<label htmlFor='artist'>Artiste :</label>
				<input
					type='text'
					name='artist'
					id='artist'
					className='text-black p-2 rounded-md'
				/>
			</div>

			<div className='flex flex-col gap-4'>
				<label htmlFor='file'>Son :</label>
				<input
					type='file'
					name='audioFile'
					id='file'
					className='rounded-md self-center'
					onChange={handleSong}
				/>
			</div>
			<p>
				duration = {new Date(duration * 1000).getMinutes()}:
				{new Date(duration * 1000).getSeconds()}
			</p>
			<p>{state?.message}</p>
			<button type='submit' className=''>
				Enregistrer
			</button>
		</form>
	)
}
