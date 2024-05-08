import Link from 'next/link'
import LoginButton from '../auth/LoginButton'
import { getServerSession } from 'next-auth'
import { authConfig } from '../../../pages/api/auth/[...nextauth]'
import UserMini from '../user/UserMini'
import SecondaryLinkButton from './SecondaryLinkButton'
import PrimaryLinkButton from './PrimaryLinkButton'

const adminsEnv = process.env.ADMINS

export default async function Header() {
	const session = await getServerSession(authConfig)

	let isAdmin = false
	if (session?.user.discordId && adminsEnv) {
		isAdmin = adminsEnv?.split(',').includes(session.user.discordId)
	}
	return (
		<header className='flex items-center justify-between w-full h-20 p-4'>
			<Link className={' text-5xl opacity-50'} href={'/'}>
				Noble App
			</Link>
			<div className='flex gap-5 h-full justify-around items-center p-1'>
				{isAdmin ? (
					<PrimaryLinkButton href='http://localhost:5555' passHref={true}>
						Database
					</PrimaryLinkButton>
				) : (
					''
				)}
				<SecondaryLinkButton href='/help'>Aide</SecondaryLinkButton>
				{session ? <UserMini /> : <LoginButton />}
			</div>
		</header>
	)
}
