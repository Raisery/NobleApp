'use server'
import { File } from 'buffer'
import fs from 'fs'
import prisma from '../prisma'
import { revalidatePath } from 'next/cache'
const storage = process.env.STORAGE_FOLDER

export async function createSong(prevState: any, formData: FormData) {
	if (!storage) return { message: 'STORAGE_FOLDER in .env file is not defined' }
	const data = {
		title: formData.get('title'),
		artist: formData.get('artist'),
		file: formData.get('audioFile'),
		userId: formData.get('userId'),
		guildId: formData.get('guildId'),
		duration: formData.get('duration'),
	}
	const duration = (data.duration as unknown as number) * 1000
	// Test it out:
	const file = data.file as unknown as File
	const fileBuffer = await file.arrayBuffer()

	const potentialSimilarSongs = await prisma.song.findMany({
		where: {
			duration: new Date(duration),
			guildId: data.guildId as string,
		},
	})
	console.log(potentialSimilarSongs)
	let isDuplicate = false
	for (const similarSong of potentialSimilarSongs) {
		const similarBuffer = fs.readFileSync(storage + '/' + similarSong.id + '.mp3')
		if (similarBuffer.compare(Buffer.from(fileBuffer)) === 0) {
			isDuplicate = true
		}
	}
	if (isDuplicate) {
		return { message: 'Duplicate file detected', status: 'NOK' }
	}
	const song = await prisma.song.create({
		data: {
			title: data.title as string,
			duration: new Date(duration),
			authorId: data.userId as string,
			guildId: data.guildId as string,
			artist: data.artist as string,
		},
	})

	const folder = fs.readdirSync(storage)
	console.log(folder)
	fs.writeFileSync(storage + '/' + song.id + '.mp3', Buffer.from(fileBuffer))
	revalidatePath('/dashboard')
	return { message: 'Success', status: 'OK' }
}
