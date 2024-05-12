import { Events, VoiceState } from 'discord.js'
import NobleApp from '../../utils/ClientSingleton'
import path from 'path'
import { createAudioResource, joinVoiceChannel } from '@discordjs/voice'
import Logger from '../../utils/Logger'
import { EventType } from '../../lib/definitions'
const storage = process.env.STORAGE_FOLDER as string
const storagePath = path.join(process.cwd(), storage)

const voice = {
	name: Events.VoiceStateUpdate,
	once: false,
	isClientEvent: true,
	isPlayerEvent: false,
	async execute(oldState: VoiceState, newState: VoiceState) {
		const app = NobleApp.get()
		if (app.guildsState.get(oldState.guild.id) !== 'ACTIVE') return
		if (!oldState.member || !newState.member)
			return Logger.info('VoiceStateUpdate : There is no member in states')
		const guildEvents = await app.db.guildVoiceEvent.findMany({
			where: {
				guildId: oldState.guild.id,
			},
		})
		const userEvents = await app.db.userVoiceEvent.findMany({
			where: {
				userId: oldState.member?.user.id,
				guildId: oldState.guild.id,
			},
			include: {
				song: true,
			},
		})
		if (!guildEvents) Logger.info('There is no events for ' + oldState.guild.name)
		if (!userEvents) Logger.info('There is no adverts for ' + oldState.member?.user.username)
		const connection = userEvents.find(event => event.type === EventType.CONNECTION)
		const deconnection = userEvents.find(event => event.type === EventType.DECONNECTION)
		const onpenStream = userEvents.find(event => event.type === EventType.OPEN_STREAM)
		const closeStream = userEvents.find(event => event.type === EventType.CLOSE_STREAM)

		switch (getEventTriggered(oldState, newState)) {
			case 'BOT':
				return
			case 'CONNECTION':
				if (!connection) return
				playSong(connection.song, newState)
				Logger.event(' - CONNECTION : ' + newState.member.user.username)
				return
			case 'DISCONNECTION':
				if (!deconnection) return
				playSong(deconnection.song, oldState)
				return
			case 'SWITCH':
				return
			case 'STREAM_ON':
				if (!onpenStream) return
				playSong(onpenStream.song, newState)
				return
			case 'STREAM_OFF':
				if (!closeStream) return
				playSong(closeStream.song, newState)
				return
		}
	},
}

export default voice

function getEventTriggered(o: VoiceState, n: VoiceState) {
	if (n.member?.user.bot) return 'BOT'
	if (n.channelId == null) return 'DISCONNECTION'
	if (n.channelId != o.channelId && o.channelId == null) return 'CONNECTION'
	if (n.channelId != o.channelId && o.channelId != null) return 'SWITCH'
	if (n.streaming != o.streaming && o.streaming == false) return 'STREAM_ON'
	if (n.streaming != o.streaming && o.streaming == true) return 'STREAM_OFF'
	else return null
}

function playSong(
	song: {
		id: number
		title: string
		duration: Date
		artist: string
		authorId: string
		guildId: string
		volume: number
	},
	n: VoiceState
) {
	const songPath = path.join(storagePath, song.id + '.mp3')
	const app = NobleApp.get()
	if (!n.channelId) return
	const connection = joinVoiceChannel({
		channelId: n.channelId,
		guildId: n.guild.id,
		adapterCreator: n.guild.voiceAdapterCreator,
	})
	const resource = createAudioResource(songPath, {
		inlineVolume: true,
	})
	resource.volume?.setVolume(song.volume)
	app.subscription = connection.subscribe(app.player)
	app.player.play(resource)
}
