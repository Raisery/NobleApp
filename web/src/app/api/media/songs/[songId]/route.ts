import fs from 'fs'
import { NextApiRequest, NextApiResponse } from 'next'
import { NextResponse } from 'next/server'
import path from 'path'
import { ReadableOptions } from 'stream'
const storage = path.join(process.cwd(), process.env.STORAGE_FOLDER as string)

function streamFile(path: string, options?: ReadableOptions): ReadableStream<Uint8Array> {
	const downloadStream = fs.createReadStream(path, options)

	return new ReadableStream({
		start(controller) {
			downloadStream.on('data', (chunk: Buffer) => controller.enqueue(new Uint8Array(chunk)))
			downloadStream.on('end', () => controller.close())
			downloadStream.on('error', (error: NodeJS.ErrnoException) => controller.error(error))
		},
		cancel() {
			downloadStream.destroy()
		},
	})
}

export function GET(request: Request, { params }: { params: { songId: string } }) {
	const { songId } = params
	if (!songId) return Response.json({ message: 'ERROR' }, { status: 400 })

	const songPath = path.join(storage, songId as string)

	const file = fs.readFileSync(songPath)
	const stats = fs.statSync(songPath)
	const data: ReadableStream<Uint8Array> = streamFile(songPath)
	const res = new NextResponse(data, {
		status: 200,
		headers: new Headers({
			'content-disposition': `attachment; filename=${path.basename(songPath)}`,
			'content-type': 'audio/mpeg',
			'content-length': stats.size + '',
		}),
	})

	return res
}
