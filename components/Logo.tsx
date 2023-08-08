import logo from '@/assets/images/petit-logo@3x.png'
import Image from 'next/image'
import Link from 'next/link'

export default ({ showText }: { showText: boolean }) => (
	<div className="flex w-full justify-center items-center">
		<Link
			href="/"
			data-cypress-id="home-logo-link"
			className="flex items-center justify-center no-underline my-1 mx-auto md:my-4 lg:my-4 lg:mx-auto"
		>
			<Image
				src={logo}
				alt="Logo Nos Gestes Climat"
				className="w-[50px] md:w-[100px]  h-auto"
			/>
			{showText && (
				<div className="text-xl md:text-3xl text-primaryDark font-extrabold ml-2 !leading-[0.85] uppercase">
					<span className="w-full block">Nos</span>
					<span className="w-full block">Gestes</span>
					<span className="w-full block">Climat</span>
				</div>
			)}
		</Link>
	</div>
)
