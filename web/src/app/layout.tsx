import type { Metadata } from 'next'
import './globals.css'
import Header from '@/ui/layout/Header'
import { Suspense } from 'react'
import Loading from '@/ui/loading/loading'
import { Jersey_25 } from 'next/font/google'

export const metadata: Metadata = {
	title: 'Discordify',
	description: 'Web interface to manage the Discordify bot on your server',
}

const Jersey = Jersey_25({ weight: '400', subsets: ['latin'] })

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='fr'>
			<body className={'w-screen h-screen p-8'}>
				<main
					id='root-layout'
					className={
						Jersey.className +
						' w-full h-full overflow-hidden rounded-lg bg-gradient-linear flex flex-col text-xl'
					}
				>
					<Header />
					<Suspense fallback={<Loading />}>
						<div className='w-full h-full overflow-hidden'>{children}</div>
					</Suspense>
				</main>
			</body>
		</html>
	)
}
