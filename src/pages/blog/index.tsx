import Container from 'components/Container';
import {
  LightBlogIndexLoader,
  DarkBlogIndexLoader,
} from 'components/Blog/BlogIndexLoader';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { api } from '~/utils/api';
import { generateSSGHelper } from '~/server/api/helpers/ssgHelper';
import { type GetStaticProps } from 'next';

export default function FeedPage() {
  const { data: allBlogs, isLoading } = api.blog.listBlog.useQuery();
  const { systemTheme } = useTheme();

  if (isLoading) {
    if (systemTheme === 'light') return <LightBlogIndexLoader />;
    else if (systemTheme === 'dark') return <DarkBlogIndexLoader />;
  }

  return (
    <Container>
      {allBlogs?.length ? (
        allBlogs.map((blog) => (
          <article key={blog.slug} className="mb-10">
            {blog.slug ? (
              <Link href={`/blog/${blog.slug}`} className="font-bold">
                <h1 className="!my-0">{blog.title}</h1>
              </Link>
            ) : null}
            <p className="!my-1">{blog.description}</p>
            {blog.slug ? (
              <Link
                href={`/blog/${blog.slug}`}
                className="relative font-medium !no-underline before:absolute before:-bottom-0.5 before:-left-0.5 before:-z-10 before:h-2.5 before:w-full before:bg-neutral-300 before:duration-300 before:ease-in-out before:hover:bottom-0 before:hover:h-full dark:before:bg-neutral-500"
              >
                Read more
              </Link>
            ) : null}
            {blog.createdAt ? (
              <div className="text-base text-gray-400">
                <time>
                  {new Date(blog.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </time>
              </div>
            ) : null}
          </article>
        ))
      ) : (
        <p>No blog posted yet 😐</p>
      )}
    </Container>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const ssg = generateSSGHelper();
  await ssg.blog.listBlog.prefetch();

  return {
    props: {
      trpcState: ssg.dehydrate(),
    },
  };
};
