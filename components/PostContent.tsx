import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Image from 'next/image';
import remarkImages from 'remark-images';
import Link from 'next/link';

type Post = {
  slug?: string;
  title?: string;
  author?: string;
  date?: Date;
  content?: string;
  excerpt?: string;
  [key: string]: unknown;
};

export default function PostContent({ post }: { post: Post }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm, remarkImages]}
      components={{
        img: (props) => (
          <Image
            src={props.src ?? ''}
            alt={props.alt ?? ''}
            width={1440}
            height={1920}
            className={'rounded-md'}
          />
        ),
        a: (props) => (
          <Link
            href={`${props.href ?? ''}`}
            className="relative font-semibold !no-underline before:absolute before:-left-0.5 before:-bottom-0.5 before:-z-10 before:h-2.5 before:w-full before:bg-neutral-300 before:duration-300 before:ease-in-out before:hover:bottom-0 before:hover:h-full dark:before:bg-neutral-500"
          >
            {props.children}
          </Link>
        ),
        h1: (props) => (
          <h1 className="!mb-0 !font-semibold">{props.children}</h1>
        ),
        h2: (props) => (
          <h2 className="!mb-0 !mt-0 !font-semibold">{props.children}</h2>
        ),
        code: (props) => (
          <code className="rounded bg-neutral-200 p-1 dark:bg-neutral-700">
            {props.children}
          </code>
        ),
      }}
    >
      {post.content ?? ''}
    </ReactMarkdown>
  );
}
