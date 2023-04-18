import type { InferGetStaticPropsType } from 'next'
import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Comment from 'components/Comment'
import Container from 'components/Container'
import distanceToNow from 'lib/util/dateRelative'
import { getAllPosts, getPostBySlug } from 'lib/getPost'
import PostContent from 'components/PostContent'


export default function PostPage({
  post,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter()

  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />
  }

  return (
    <Container>
      {router.isFallback ? (
        <div>Loading…</div>
      ) : (
        <div>
          <article>
            <header className='prose-zinc prose-base sm:prose-lg md:prose-xl lg:prose-2xl'>
              <h1 className="font-bold !mb-0">{post.title}</h1>
              {post.excerpt ? (
                <p className="!my-2">{post.excerpt}</p>
              ) : null}

              {post.date ? (
              <time className="flex !mt-2 text-gray-400 text-base">
              {distanceToNow(new Date(post.date))}
            </time>
              ) : null}
            </header>
            
            <section className="prose-neutral prose-base sm:prose-base md:prose-lg lg:prose-lg mt-10 prose-a:underline">
              <PostContent post={post}/>
            </section>
          </article>

          <Comment />
        </div>
      )}
    </Container>
  )
}

type Params = {
  params: {
    slug: string
  }
}

export function getStaticProps({ params }: Params) {
  const post = getPostBySlug(params.slug, [
    'slug',
    'title',
    'excerpt',
    'date',
    'content',
  ])
  const content = post.content;

  return {
    props: {
      post: {
        ...post,
        content,
      },
    },
  }
}

export function getStaticPaths() {
  const posts = getAllPosts(['slug'])

  return {
    paths: posts.map(({ slug }) => {
      return {
        params: {
          slug,
        },
      }
    }),
    fallback: false,
  }
}