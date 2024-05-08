'use client'

import Image from 'next/image'
import defaultIcon from '../../../public/discordgrey.png'
import Link from 'next/link'
import { Guild } from 'discord.js'
import { usePathname } from 'next/navigation'
import BotIcon from '../bot/BotIcon'

type GuildProps = {
	guild: Guild
}

export default function GuildTile({ guild }: GuildProps) {
	const currentGuildID = usePathname()?.split('/').pop()

	let select = ' border-[#FFAB96]/80 hover:bg-[#8729B3]/20 hover:scale-101'
	if (currentGuildID === guild.id) select = 'border-[#8729B3]/30 bg-[#8729B3]/20 scale-101'

	return (
		<Link
			className={
				'flex h-[12%] gap-3 items-center w-full px-4 bg-black/15 rounded-md border-4 group ' +
				select
			}
			href={'/dashboard/' + guild.id}
		>
			<Image
				src={
					guild.icon
						? 'https://cdn.discordapp.com/icons/' + guild.id + '/' + guild.icon + '.png'
						: defaultIcon
				}
				alt='Server icon'
				width={80}
				height={80}
				className={
					currentGuildID === guild.id
						? 'rounded-full animate-spin-slow mx-3'
						: ' rounded-full group-hover:animate-swell mx-3'
				}
			/>

			<div className='h-4/5 w-1 bg-white/20 rounded-xl'></div>
			<div className='w-full'>
				<p className={' text-xl'}>{guild.name}</p>
				<p>{guild.id}</p>
				<p>{currentGuildID}</p>
			</div>
			<div className='h-4/5 w-1 bg-white/20 rounded-xl'></div>
			<div className='flex gap-2'>
				<BotIcon bot='NobleBot' connected={true} />
				<BotIcon bot='Musicify' connected={false} />
			</div>
		</Link>
	)
}
