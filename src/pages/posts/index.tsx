import Container from 'components/Container';
import Link from 'next/link';
import { api } from '~/utils/api';

export default function PostsPage() {
  const { data: allPosts } = api.post.listPosts.useQuery();
  return (
    <Container>
      {allPosts?.length ? (
        allPosts.map((post) => (
          <article key={post.slug} className="mb-10">
            {post.slug ? (
              <Link href={`/posts/${post.slug}`} className="font-bold">
                <h1 className="!my-0">{post.title}</h1>
              </Link>
            ) : null}
            <p className="!my-1">{post.description}</p>
            {post.slug ? (
              <Link
                href={`/posts/${post.slug}`}
                className="relative font-medium !no-underline before:absolute before:-left-0.5 before:-bottom-0.5 before:-z-10 before:h-2.5 before:w-full before:bg-neutral-300 before:duration-300 before:ease-in-out before:hover:bottom-0 before:hover:h-full dark:before:bg-neutral-500"
              >
                Read more
              </Link>
            ) : null}
            {post.createdAt ? (
              <div className="text-base text-gray-400">
                <time>
                  {new Date(post.createdAt).toLocaleDateString('en-US', {
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
