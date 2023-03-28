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
			a: (props) => {
				return <Link href={`${props.href ?? ''}`}>{props.children}</Link>;
			}
    }}
  >
    {post.content ?? ''}
  </ReactMarkdown>
	)
}