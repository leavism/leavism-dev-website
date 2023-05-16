import Link from 'next/link';
import { type NextRouter, useRouter } from 'next/router';
import Container from './Container';

export default function Navbar() {
  return (
    <header className="py-6">
      <Container>
        <nav className="flex space-x-7 py-1">
          <NavButton href="/">Home</NavButton>
          <NavButton href="/blog">Blog</NavButton>
        </nav>
      </Container>
    </header>
  );
}

type NavButtonProps = {
  children: React.ReactNode;
  href: string;
};

function NavButton({ children, href, ...props }: NavButtonProps) {
  const router: NextRouter = useRouter();
  const activeLink = (url: string, pathname: string) =>
    pathname === url ? 'font-bold ' : '';
  const active: string = activeLink(href, router.pathname);

  return (
    <div className="navButton">
      <Link
        href={href}
        className={
          active +
          'flex justify-center rounded-full border border-solid border-transparent px-4 py-1 transition-all duration-150 ease-out hover:-translate-x-1 hover:border-gray-700 hover:shadow-[3px_3px_0px] focus-visible:outline-offset-1 dark:border dark:hover:border-white'
        }
        {...props}
      >
        {children}
      </Link>
    </div>
  );
}
