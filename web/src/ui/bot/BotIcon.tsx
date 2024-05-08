export default function BotIcon({ bot, connected }: { bot: string; connected: boolean }) {
	return (
		<div className=' flex flex-col items-center bg-white/10 rounded-lg p-2'>
			<p className=' font-bold text-lg'>{bot}</p>
			<div
				className={'w-2 h-2 rounded-full ' + (connected ? ' bg-green-300' : ' bg-red-500')}
			></div>
			<p className={' font-semibold' + (connected ? ' text-green-300' : ' text-red-700')}>
				{connected ? 'Disponible' : 'Indisponible'}
			</p>
		</div>
	)
}
