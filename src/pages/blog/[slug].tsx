import { type GetStaticProps } from 'next';
import { type NextRouter, useRouter } from 'next/router';
import ErrorPage from 'next/error';
import { useTheme } from 'next-themes';
import { generateSSGHelper } from '~/server/api/helpers/ssgHelper';
import distanceToNow from 'lib/util/dateRelative';
import { api } from '~/utils/api';
import Comment from 'components/Comment';
import Container from 'components/Container';
import BlogView from 'components/Blog/BlogView';
import { BlogLoader, DarkBlogLoader } from 'components/Blog/BlogLoader';

export const getStaticProps: GetStaticProps = async (context) => {
  const ssg = generateSSGHelper();
  const slug = context.params?.slug as string;

  await ssg.blog.getBlogBySlug.prefetch({ slug });

  return {
    props: {
      trpcState: ssg.dehydrate(),
      slug,
    },
  };
};

export const getStaticPaths = () => {
  return { paths: [], fallback: 'blocking' };
};

export default function BlogPage() {
  const router: NextRouter = useRouter();
  const { systemTheme } = useTheme();
  const blogSlug = api.blog.getBlogBySlug;
  const { data: blog, isLoading } = blogSlug.useQuery({
    slug: router.query.slug as string,
  });

  if (isLoading) {
    if (systemTheme === 'light') return <BlogLoader />;
    else if (systemTheme === 'dark') return <DarkBlogLoader />;
  }
  if (!blog) return <ErrorPage statusCode={404} />;

  return (
    <Container>
      <div>
        <article>
          <header className="prose-base prose-zinc sm:prose-lg md:prose-xl lg:prose-2xl">
            <h1 className="!mb-0 font-bold">{blog?.title}</h1>
            {blog?.description ? (
              <p className="!my-2">{blog?.description}</p>
            ) : null}

            {blog?.createdAt ? (
              <time className="!mt-2 flex text-base text-gray-400">
                {distanceToNow(new Date(blog?.createdAt))}
              </time>
            ) : null}
          </header>

          <section className="prose-base prose-neutral mt-10 sm:prose-base md:prose-lg lg:prose-lg prose-a:underline">
            <BlogView blog={blog} />
          </section>
        </article>

        <Comment />
      </div>
    </Container>
  );
}
