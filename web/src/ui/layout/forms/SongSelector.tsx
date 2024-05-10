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
	options.push(<option value={-1}>{'Aucun'}</option>)
	if (!selected) selected = -1
	return (
		<div className='text-black'>
			<label htmlFor={event}>{label}</label>
			<select name={event} id={event + Math.floor(Math.random())} defaultValue={selected}>
				{options}
			</select>
		</div>
	)
}
