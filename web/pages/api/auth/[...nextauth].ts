import prisma from '@/lib/prisma'
import sleep from '@/lib/sleep'
import { PrismaAdapter } from '@auth/prisma-adapter'
import NextAuth, { NextAuthOptions } from 'next-auth'
import { Adapter } from 'next-auth/adapters'
import Discord from 'next-auth/providers/discord'

const discordId = process.env.DISCORD_CLIENT_ID
const discordSecret = process.env.DISCORD_CLIENT_SECRET

if (!discordId || !discordSecret) {
	throw new Error('Missing DISCORD_ID or DISCORD_CLIENT environnement variable')
}

export const authConfig = {
	providers: [
		Discord({
			clientId: discordId,
			clientSecret: discordSecret,
			authorization: {
				params: { scope: 'identify guilds connections' },
			},
		}),
	],
	adapter: PrismaAdapter(prisma) as Adapter,
	secret: process.env.NEXTAUTH_SECRET,
	session: {
		strategy: 'jwt',
	},
	jwt: {
		secret: process.env.NEXTAUTH_SECRET,
	},
	callbacks: {
		async jwt({ token, account, user }) {
			token.accessToken = account?.access_token
			return { ...token, ...user, ...account }
		},
		async session({ session, token, user }) {
			if (token.access_token && token.providerAccountId) {
				session.user.token = token.access_token as string
				session.user.discordId = token.providerAccountId as string
			}
			return session
		},
		async signIn({ user, account }) {
			if (user && account) {
				const res = await fetch('https://discord.com/api/users/@me/guilds', {
					headers: {
						authorization: 'Bearer ' + account.access_token,
					},
				})
				const userGuilds = await res.json()
				const botGuild = await prisma.guild.findMany({ where: { id: { not: 'a' } } })
				try {
					await prisma.nobleUser.upsert({
						where: {
							id: account.providerAccountId as string,
						},
						update: {
							name: user.name as string,
						},
						create: {
							id: account.providerAccountId as string,
							name: user.name as string,
						},
					})
					for (const guild of botGuild) {
						for (const userGuild of userGuilds) {
							if (guild.id === userGuild.id) {
								await prisma.guild.update({
									where: {
										id: guild.id as string,
									},
									data: {
										users: {
											connect: {
												id: account.providerAccountId as string,
											},
										},
									},
								})
							}
						}
					}
					await sleep(1000)
					return true
				} catch (err) {
					console.error(err)
				}
			}
			return '/unauthorized'
		},
		async redirect({ url, baseUrl }) {
			// Allows relative callback URLs
			if (url.startsWith('/')) return `${baseUrl}${url}`
			// Allows callback URLs on the same origin
			else if (new URL(url).origin === baseUrl) return url
			return baseUrl
		},
	},
} satisfies NextAuthOptions

export default NextAuth(authConfig)
