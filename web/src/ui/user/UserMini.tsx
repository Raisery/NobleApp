import { getServerSession } from 'next-auth'
import Image from 'next/image'
import LogoutButton from '../auth/LogoutButton'
import LinkButton from '../layout/SecondaryLinkButton'
import { authConfig } from '@/app/api/auth/[...nextauth]/route'
import { Space_Mono } from 'next/font/google'

const Space = Space_Mono({ weight: '700', subsets: ['latin'] })

export default async function UserMini() {
	const session = await getServerSession(authConfig)
	if (!session) return
	if (!session.user.image) session.user.image = 'https://cdn.discordapp.com/embed/avatars/0.png'
	return (
		<div className={Space.className + ' flex gap-4 justify-center items-center h-full'}>
			<LinkButton href='/dashboard'>Dashboard</LinkButton>
			<Image
				src={session.user.image}
				width={40}
				height={40}
				alt='user avatar'
				className='rounded-full'
			/>
			<p>{session.user.name}</p>

			<LogoutButton />
		</div>
	)
}
