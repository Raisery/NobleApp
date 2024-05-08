import { getServerSession } from 'next-auth'
import { authConfig } from '../../pages/api/auth/[...nextauth]'
import PrimaryLinkButton from '@/ui/layout/PrimaryLinkButton'

export default async function Home() {
	const session = await getServerSession(authConfig)
	return (
		<div className='flex flex-col h-full w-full items-center'>
			<div className='w-1/2'>
				<PrimaryLinkButton href='https://discord.com/oauth2/authorize?client_id=1230499719172591696&permissions=8&scope=bot'>
					Invite the bot !
				</PrimaryLinkButton>
			</div>
		</div>
	)
}
