'use client'
import { createSong } from '@/lib/formActions/createSong'
import { FormEvent, MouseEventHandler, useState } from 'react'
import { useFormState } from 'react-dom'

const initalState = {
	message: '',
	status: 'NOK',
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
	const [volume, setVolume] = useState('50')
	const [audio, setAudio] = useState<any>('')

	function handleSong(event: FormEvent<HTMLInputElement>) {
		const fileList = event.currentTarget.files
		if (!fileList) return
		const song = fileList[0]
		const ctx = new AudioContext()
		song.arrayBuffer().then(fileBuffer => {
			ctx.decodeAudioData(fileBuffer).then(decodedAudio => {
				setDuration(decodedAudio.duration)
				setAudio(URL.createObjectURL(song))
			})
		})
		const audioPreview = document.getElementById('audioPreview') as HTMLAudioElement
		audioPreview.volume = 0.5
	}

	function handleVolumeChange(event: FormEvent<HTMLInputElement>) {
		const audioPreview = document.getElementById('audioPreview') as HTMLAudioElement
		const target = event.target as HTMLInputElement
		setVolume(target.value)
		audioPreview.volume = Number.parseFloat(target.value) * 0.01
	}
	function togglePlay(event: React.MouseEvent<HTMLButtonElement>) {
		const audioPreview = document.getElementById('audioPreview') as HTMLAudioElement
		if (audioPreview.currentTime > 0 && audioPreview.currentTime < audioPreview.duration) {
			audioPreview.pause()
			audioPreview.currentTime = 0
		} else {
			audioPreview.play()
		}
	}

	return (
		<form
			action={formAction}
			className=' flex flex-col border-4 border-white/30 rounded-lg w-2/3 h-full p-4 justify-evenly'
		>
			<input type='text' name='userId' value={userId} className='hidden' readOnly />
			<input type='text' name='guildId' value={guildId} className='hidden' readOnly />
			<input type='number' name='duration' value={duration} className='hidden' readOnly />
			<div className='flex flex-col gap-4'>
				<label htmlFor='title'>Titre :</label>
				<input
					type='text'
					name='title'
					id='title'
					className='text-black p-2 rounded-md'
					required
				/>
			</div>

			<div className='flex flex-col gap-4'>
				<label htmlFor='artist'>Artiste :</label>
				<input
					type='text'
					name='artist'
					id='artist'
					className='text-black p-2 rounded-md'
					defaultValue={'INCONNU'}
					required
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
					required
				/>
			</div>
			<div className='flex w-full justify-between'>
				<label htmlFor='volume'>Volume :{Number.parseFloat(volume)}%</label>
				<input
					className='w-2/3'
					type='range'
					name='volume'
					id='volume'
					onInput={handleVolumeChange}
				/>
			</div>
			<p>
				Duration = {new Date(duration * 1000).getMinutes()}min
				{new Date(duration * 1000).getSeconds()}
			</p>
			<audio id='audioPreview' src={audio}></audio>
			<button onClick={togglePlay} type='button'>
				Play
			</button>
			<p>{state?.message}</p>
			<button type='submit' className=''>
				Enregistrer
			</button>
		</form>
	)
}
