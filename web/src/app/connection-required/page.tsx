import LoginButton from '@/ui/auth/LoginButton'

export default function ConnectionRequired() {
	return (
		<div className='flex flex-col h-full w-full justify-center items-center'>
			<h1>Tu dois être connecté pour aller plus loin</h1>
			<p>Clique sur ce bouton</p>
			<div className='h-12'>
				<LoginButton />
			</div>
		</div>
	)
}
