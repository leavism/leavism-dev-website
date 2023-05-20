import Link from 'next/link';

type adminLinkProps = {
  children: React.ReactNode;
  path: string;
};

export default function BlogEditButton({ children, path }: adminLinkProps) {
  return (
    <Link
      href={path}
      className="flex h-fit justify-center rounded-md border border-solid px-4 py-1 transition-all duration-150 ease-out hover:-translate-x-1 hover:border-gray-700 hover:shadow-[3px_3px_0px] focus-visible:outline-offset-1 dark:border dark:hover:border-white"
    >
      {children}
    </Link>
  );
}
