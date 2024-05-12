import Link from 'next/link'
import { ReactNode } from 'react'
import { Space_Mono } from 'next/font/google'

const Space = Space_Mono({ weight: '700', subsets: ['latin'] })

type LinkedButtonType = {
	href: string
	children: ReactNode
}
export default function SecondaryLinkButton({ href, children }: LinkedButtonType) {
	return (
		<Link href={href} className= { Space.className + ' flex h-full justify-center items-center p-4 rounded-md bg-gradient-linear' }>
			{children}
		</Link>
	)
}
