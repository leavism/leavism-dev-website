import type { InferGetStaticPropsType } from 'next'
import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Head from 'next/head'
// import Comment from 'components/comment'
import Container from 'components/Container'
import distanceToNow from 'lib/util/dateRelative'
import markdownToHtml from 'lib/util/markdownToHtml'
import { getAllPosts, getPostBySlug } from 'lib/getPost'


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

            <div
              className="prose-neutral prose-base sm:prose-base md:prose-lg lg:prose-lg mt-10"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </article>

          {/* <Comment /> */}
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

export async function getStaticProps({ params }: Params) {
  const post = getPostBySlug(params.slug, [
    'slug',
    'title',
    'excerpt',
    'date',
    'content',
  ])
  const content = await markdownToHtml(post.content || '')

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