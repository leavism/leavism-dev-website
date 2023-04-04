import Link from "next/link";
import { type NextRouter, useRouter } from "next/router";
import Container from "./Container";

export default function Navbar() {
	return (
		<header className="py-6">
			<Container>
				<nav className="flex space-x-7 py-1">
					<NavButton href='/'>Home</NavButton>
					<NavButton href='/posts'>Blog</NavButton>
				</nav>
			</Container>
		</header>
	)
}

type NavButtonProps = {
	children: React.ReactNode
	href: string
}

function NavButton({ children, href, ...props}: NavButtonProps) {
	const activeLink = (url: string, pathname: string) => pathname === url ? "font-bold " : "";
	const router: NextRouter = useRouter();
	const active: string = activeLink(href, router.pathname)

	return (
		<div className="navButton">
			<Link href={href} className={active + "border border-solid border-transparent px-2 py-1 rounded-full w-[5rem] flex justify-center transition-all duration-150 ease-out hover:shadow-[3px_3px_0px] hover:-translate-x-1 hover:border-gray-700 dark:hover:border-white dark:border focus-visible:outline-offset-1"} {...props}>{children}</Link>
		</div>
	)
}

