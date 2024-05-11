'use server'
import prisma from '../prisma'
import { EventType } from '../definition'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

export async function createUserEvent(prevState: any, formData: FormData) {
	const data = {
		connection: formData.get(EventType.CONNECTION) as string,
		deconnection: formData.get(EventType.DECONNECTION) as string,
		openStream: formData.get(EventType.OPEN_STREAM) as string,
		closeStream: formData.get(EventType.CLOSE_STREAM) as string,
		guildId: formData.get('guildId') as string,
		userId: formData.get('userId') as string,
	}
	const user = await prisma.nobleUser.findUnique({
		where: { id: data.userId },
		include: { voiceEvents: { where: { guildId: data.guildId } } },
	})

	if (!user) return { message: 'User not found', status: 'NOK' }

	await updateEvent(EventType.CONNECTION, Number(data.connection), user, data.guildId)
	await updateEvent(EventType.DECONNECTION, Number(data.deconnection), user, data.guildId)
	await updateEvent(EventType.OPEN_STREAM, Number(data.openStream), user, data.guildId)
	await updateEvent(EventType.CLOSE_STREAM, Number(data.closeStream), user, data.guildId)

	revalidatePath('/dashboard')
	return { message: 'Success', status: 'OK' }
}

async function updateEvent(
	eventType: EventType,
	songId: number,
	user: {
		voiceEvents: {
			id: number
			type: string
			userId: string
			songId: number
			guildId: string
			isActive: boolean
		}[]
	} & {
		id: string
		name: string
	},
	guildId: string
) {
	const connectionEvent = user.voiceEvents.find(event => event.type === eventType)

	if (!connectionEvent && songId > 0) {
		await prisma.userVoiceEvent.create({
			data: {
				isActive: true,
				type: eventType,
				guildId: guildId,
				songId: songId,
				userId: user.id,
			},
		})
	} else if (connectionEvent && songId > 0) {
		await prisma.userVoiceEvent.update({
			where: { id: connectionEvent.id },
			data: { songId: songId },
		})
	} else if (connectionEvent) {
		await prisma.userVoiceEvent.delete({
			where: { id: connectionEvent.id },
		})
	}
}
