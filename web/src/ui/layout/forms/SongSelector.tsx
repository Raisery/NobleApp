import { EventType } from '@/lib/definition'
import { Prisma } from '@prisma/client'

type SongSelectorProps = {
	selected: number | undefined
	songs: {
		id: number
		title: string
		duration: Date
		authorId: string
		guildId: string
	}[]
	event: EventType
	label: string
}

export default function SongSelector({ songs, event, label, selected }: SongSelectorProps) {
	const options = songs.map(song => {
		return (
			<option key={song.id + event} value={JSON.stringify(song.id)}>
				{song.title}
			</option>
		)
	})
	options.push(
		<option key={'Empty' + event} value={-1}>
			{'Aucun'}
		</option>
	)
	if (!selected) selected = -1
	return (
		<div className='flex justify-between'>
			<label htmlFor={event} className=' text-white'>
				{label}
			</label>
			<select
				name={event}
				className='w-1/2 text-black'
				id={event + Math.floor(Math.random())}
				defaultValue={selected}
			>
				{options}
			</select>
		</div>
	)
}
