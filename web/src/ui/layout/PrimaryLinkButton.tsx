import Link from 'next/link'
import { ReactNode } from 'react'

type LinkedButtonType = {
	href: string
	children?: ReactNode
	passHref?: boolean
	target?: string
}
export default function PrimaryLinkButton({
	href,
	children,
	passHref = false,
	target,
}: LinkedButtonType) {
	return (
		<Link
			target={target}
			href={href}
			passHref={passHref}
			className='flex h-full justify-center items-center p-4 rounded-md bg-[#FFAB96]/70'
		>
			{children}
		</Link>
	)
}
