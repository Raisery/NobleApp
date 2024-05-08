export default function Loading() {
	// You can add any UI inside Loading, including a Skeleton.
	return (
		<div className='w-full h-full flex justify-center items-center rounded-md bg-black/15'>
			<div className='rounded-full border-8 w-10 h-10 border-white/30 border-t-[#8729B3] animate-spin'></div>
		</div>
	)
}
