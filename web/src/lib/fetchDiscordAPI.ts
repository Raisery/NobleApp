import { Guild } from 'discord.js'
import { getServerSession } from 'next-auth'
import { authConfig } from '../../pages/api/auth/[...nextauth]'
import sleep from './sleep'

const nobleToken = process.env.DISCORD_BOT_TOKEN_NOBLEBOT

export async function fetchDiscordGuild(id: string): Promise<Guild> {
	if (!nobleToken) throw new Error('DISCORD_BOT_TOKEN_NOBLE is not defined in .env file !')
	const data = await fetch('https://discord.com/api/guilds/' + id, {
		headers: { authorization: nobleToken },
	})

	let guild = await data.json()
	if (!guild.id) {
		if (guild.retry_after) {
			await sleep(guild.retry_after)
			guild = await fetchDiscordUserGuilds()
		} else {
			throw new Error('Error from Discord API :' + JSON.stringify(guild))
		}
	}
	return guild
}

export async function fetchDiscordUserGuilds(): Promise<Guild[]> {
	const session = await getServerSession(authConfig)
	if (!session) throw new Error('User not logged with discord account !')

	const data = await fetch('https://discord.com/api/users/@me/guilds', {
		headers: { authorization: 'Bearer ' + session.user.token },
	})

	let guilds = await data.json()

	if (!guilds[0]) {
		if (guilds.retry_after) {
			await sleep(guilds.retry_after)
			guilds = await fetchDiscordUserGuilds()
		} else {
			throw new Error('Discord API Unauthorized Access !' + JSON.stringify(guilds))
		}
	}
	return guilds
}

export async function fetchDiscordNobleGuilds(): Promise<Guild[]> {
	if (!nobleToken) throw new Error('DISCORD_BOT_TOKEN_NOBLE is not defined in .env file !')

	const data = await fetch('https://discord.com/api/users/@me/guilds', {
		headers: { authorization: nobleToken },
	})

	let guilds = await data.json()
	if (!guilds[0]) {
		if (guilds.retry_after) {
			await sleep(guilds.retry_after)
			guilds = await fetchDiscordNobleGuilds()
		} else {
			throw new Error('Discord API Unauthorized Access !' + JSON.stringify(guilds))
		}
	}
	return guilds
}
