import Link from "next/link";
import Container from "./Container";

export default function Navbar() {
	return (
		<header className="py-6">
			<Container>
				<nav className="flex space-x-4">
					<Link href="/">Home</Link>
					<Link href="/posts">Blog</Link>
				</nav>
			</Container>
		</header>
	)
}