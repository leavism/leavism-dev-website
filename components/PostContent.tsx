import { type Post } from "interfaces";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Image from "next/image";
import remarkImages from "remark-images";
import Link from "next/link";


export default function PostContent({ post }: { post: Post} ) {
	return (
		<ReactMarkdown remarkPlugins={[remarkGfm, remarkImages]}
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
				className="!no-underline font-semibold relative before:bg-neutral-300 dark:before:bg-neutral-500 before:absolute before:-left-0.5 before:-bottom-0.5 before:w-full before:h-2.5 before:-z-10 before:ease-in-out before:duration-300 before:hover:bottom-0 before:hover:h-full">
					{props.children}
				</Link>
			),
			h1: (props) => (
				<h1
					className="!font-semibold !mb-0"
				>
					{props.children}
				</h1>
			),
			h2: (props) => (
				<h2
					className="!font-semibold !mb-0 !mt-0"
				>
					{props.children}
				</h2>
			),
			code: (props) => (
				<code
					className="bg-neutral-200 p-1 rounded dark:bg-neutral-700"
				>
					{props.children}
				</code>
			)
    }}
  >
    {post.content ?? ''}
  </ReactMarkdown>
	)
}