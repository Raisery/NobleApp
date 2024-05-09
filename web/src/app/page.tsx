import { getServerSession } from 'next-auth'
import PrimaryLinkButton from '@/ui/layout/PrimaryLinkButton'
import { authConfig } from './api/auth/[...nextauth]/route'
const invitationLink = process.env.INVITATION_LINK as string

export default async function Home() {
	const session = await getServerSession(authConfig)
	return (
		<div className='flex flex-col h-full w-full items-center'>
			<div className='w-1/2'>
				<PrimaryLinkButton href={invitationLink}>Invite the bot !</PrimaryLinkButton>
				{session ? JSON.stringify(session) : ''}
			</div>
		</div>
	)
}
