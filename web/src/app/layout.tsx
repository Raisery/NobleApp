import type { Metadata } from 'next'
import './globals.css'
import Header from '@/ui/layout/Header'
import { Suspense } from 'react'
import Loading from '@/ui/loading/loading'
import { Jersey_25 } from 'next/font/google'
import { getServerSession } from 'next-auth'
import SessionProvider from './SessionProvider'
import { authConfig } from './api/auth/[...nextauth]/route'

export const metadata: Metadata = {
	title: 'NobleApp',
	description: 'Web interface to manage the NobleApp bots on your server',
}

const Jersey = Jersey_25({ weight: '400', subsets: ['latin'] })

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	const session = await getServerSession(authConfig)

	return (
		<html lang='fr'>
			<body className={'w-screen h-screen p-8'}>
				<SessionProvider session={session}>
					<main
						id='root-layout'
						className={
							Jersey.className +
							' w-full h-full overflow-hidden rounded-lg bg-gradient-radial animate-solar bg-xl flex flex-col text-xl'
						}
					>
						<Header />
						<Suspense fallback={<Loading />}>
							<div className='w-full h-full overflow-hidden'>{children}</div>
						</Suspense>
					</main>
				</SessionProvider>
			</body>
		</html>
	)
}
