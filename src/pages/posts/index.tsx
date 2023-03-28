import Container from 'components/Container'
import type { InferGetStaticPropsType } from 'next'
import Link from 'next/link'

import distanceToNow from 'lib/util/dateRelative'
import { getAllPosts } from 'lib/getPost'

export default function NotePage({
  allPosts,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Container>
      {allPosts.length ? (
        allPosts.map((post) => (
          <article key={post.slug} className="prose-neutral prose-base sm:prose-lg md:prose-xl lg:prose-2xl mb-10">
            <Link
              as={`/posts/${post.slug}`}
              href="/posts/[slug]"
              className=" leading-6 font-bold my-0"
            >
              <h3 className="!my-0">{post.title}</h3>
            </Link>
            <p className="!my-0">{post.excerpt}</p>
            <div className="text-gray-400 text-base">
              <time>{distanceToNow(new Date(post.date))}</time>
            </div>
          </article>
        ))
      ) : (
        <p>No blog posted yet :/</p>
      )}
    </Container>
  )
}

export function getStaticProps() {
  const allPosts = getAllPosts(['slug', 'title', 'excerpt', 'date'])
  return {
    props: { allPosts },
  }
}
