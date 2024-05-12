import { ReactNode } from 'react'

type LinkedButtonType = {
	onClick: (any: any) => void
	children: ReactNode
}
export default function SecondaryActionButton({ onClick, children }: LinkedButtonType) {
	return (
		<button
			onClick={onClick}
			className='flex h-full justify-center items-center p-4 rounded-md bg-secondary/70'
		>
			{children}
		</button>
	)
}
