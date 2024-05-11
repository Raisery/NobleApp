'use client'
import { useState } from 'react'
import SecondaryActionButton from '../layout/SecondaryActionButton'

type props = {
	song: {
		id: number
		title: string
		duration: Date
		artist: string
		authorId: string
		guildId: string
		volume: number
	}
}

export default function SongPlayer({ song }: props) {
	const [isPlaying, setIsPlaying] = useState(false)

	function handlePlay(event: React.MouseEvent<HTMLButtonElement>) {
		setIsPlaying(!isPlaying)

		const audioPlayer = document.getElementById(
			song.title + song.id + song.guildId
		) as HTMLAudioElement

		audioPlayer.volume = song.volume
		if (isPlaying) {
			audioPlayer.pause()
			audioPlayer.currentTime = 0
		} else audioPlayer.play()
	}

	return (
		<div className='flex gap-2'>
			<p>{song.title}</p>
			<div className=''>
				<SecondaryActionButton onClick={handlePlay}>
					{isPlaying ? 'Pause' : 'Play'}
				</SecondaryActionButton>
			</div>
			<div>
				<audio
					id={song.title + song.id + song.guildId}
					src={'http://localhost:3000/api/media/songs/' + song.id + '.mp3'}
				></audio>
			</div>
		</div>
	)
}
