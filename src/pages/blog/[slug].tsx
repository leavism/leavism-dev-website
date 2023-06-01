import { type GetStaticProps } from 'next';
import ErrorPage from 'next/error';
import { useTheme } from 'next-themes';
import { generateSSHelper } from '~/server/api/helpers/serverSideHelper';
import distanceToNow from 'lib/util/dateRelative';
import { api } from '~/utils/api';
import Comment from 'components/Comment';
import Container from 'components/Container';
import BlogView from 'components/Blog/BlogView';
import { BlogLoader, DarkBlogLoader } from 'components/Blog/BlogLoader';
import { prisma } from '~/server/db';
import { type Blog } from 'lib/util/interface';

export const getStaticProps: GetStaticProps = async (context) => {
  const ssg = generateSSHelper();
  const slug = context.params?.slug as string;

  await ssg.blog.getBlogBySlug.prefetch({ slug });

  return {
    props: {
      trpcState: ssg.dehydrate(),
      slug,
    },
  };
};

export const getStaticPaths = async () => {
  const allBlogs = await prisma.blog.findMany({
    select: {
      slug: true,
    },
  });

  return {
    paths: allBlogs.map((blog) => ({
      params: {
        slug: blog.slug,
      },
    })),
    fallback: 'blocking',
  };
};

export default function BlogPage(props: Blog) {
  const { systemTheme } = useTheme();
  const { slug } = props;
  const { data: blog, isLoading } = api.blog.getBlogBySlug.useQuery({
    slug,
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
