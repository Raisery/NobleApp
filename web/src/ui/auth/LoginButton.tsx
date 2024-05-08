'use client'

import { signIn } from 'next-auth/react'

export default function LoginButton() {
	return (
		<button
			onClick={async () => {
				await signIn(undefined, {
					callbackUrl: '/dashboard',
				})
			}}
			className='flex items-center justify-center h-full p-4 border-4 rounded-md border-indigo-700'
		>
			Login
		</button>
	)
}
