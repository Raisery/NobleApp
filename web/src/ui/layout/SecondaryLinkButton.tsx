import Link from 'next/link'
import { ReactNode } from 'react'

type LinkedButtonType = {
	href: string
	children: ReactNode
}
export default function SecondaryLinkButton({ href, children }: LinkedButtonType) {
	return (
		<Link
			href={href}
			className='flex h-full justify-center items-center p-4 rounded-md bg-secondary/70'
		>
			{children}
		</Link>
	)
}
