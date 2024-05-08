'use client'

import { signOut } from 'next-auth/react'

export default function LogoutButton() {
	return (
		<button
			onClick={async () => {
				await signOut()
			}}
			className='flex items-center justify-center bg-red-600 h-full w-full rounded-md p-4'
		>
			Logout
		</button>
	)
}
