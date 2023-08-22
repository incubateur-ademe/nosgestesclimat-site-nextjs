import logo from '@/assets/images/petit-logo@3x.png'
import Image from 'next/image'
import Link from 'next/link'

export default ({ showText }: { showText: boolean }) => (
	<div className="flex w-full items-center justify-center pb-4 pt-8">
		<Link
			href="/"
			data-cypress-id="home-logo-link"
			className="mx-auto my-1 flex items-center justify-center no-underline md:my-4 lg:mx-auto lg:my-4"
		>
			<Image
				src={logo}
				alt="Logo Nos Gestes Climat"
				className="h-auto w-[50px]  md:w-[100px]"
			/>
			{showText && (
				<div className="ml-2 text-xl font-extrabold uppercase !leading-[0.85] text-primaryDark md:text-3xl">
					<span className="block w-full">Nos</span>
					<span className="block w-full">Gestes</span>
					<span className="block w-full">Climat</span>
				</div>
			)}
		</Link>
	</div>
)
