import { type NextRouter, useRouter } from 'next/router';
import ErrorPage from 'next/error';
import Comment from 'components/Comment';
import Container from 'components/Container';
import distanceToNow from 'lib/util/dateRelative';
import PostContent from 'components/PostContent';
import { api } from '~/utils/api';

export default function PostPage() {
  const router: NextRouter = useRouter();
  const postSlug = api.post.getPostBySlug;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
  const { data: post } = postSlug.useQuery({ slug: router.query.slug });

  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <Container>
      {router.isFallback ? (
        <div>Loading…</div>
      ) : (
        <div>
          <article>
            <header className="prose-base prose-zinc sm:prose-lg md:prose-xl lg:prose-2xl">
              <h1 className="!mb-0 font-bold">{post?.title}</h1>
              {post?.description ? (
                <p className="!my-2">{post?.description}</p>
              ) : null}

              {post?.createdAt ? (
                <time className="!mt-2 flex text-base text-gray-400">
                  {distanceToNow(new Date(post?.createdAt))}
                </time>
              ) : null}
            </header>

            <section className="prose-base prose-neutral mt-10 sm:prose-base md:prose-lg lg:prose-lg prose-a:underline">
              <PostContent post={post} />
            </section>
          </article>

          <Comment />
        </div>
      )}
    </Container>
  );
}
