type FooterProps = {
	children: React.ReactNode
}

export default function Footer({ children }: FooterProps) {
	return (
		<footer
			className="max-w-2xl mt-auto mx-auto prose-sm pt-5"
		>
			{children}
		</footer>
	)
}