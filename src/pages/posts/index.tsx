import Container from "components/Container";
import type { InferGetStaticPropsType } from "next";
import Link from "next/link";
import { getAllPosts } from "lib/getPost";

export default function NotePage({
  allPosts,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Container>
      {allPosts.length ? (
        allPosts.map((post) => (
          <article key={post.slug} className="mb-10">
            {post.slug ? (
              <Link href={`/posts/${post.slug}`} className="font-bold">
                <h1 className="!my-0">{post.title}</h1>
              </Link>
            ) : null}
            <p className="!my-1">{post.excerpt}</p>
            {post.slug ? (
              <Link
                href={`/posts/${post.slug}`}
                className="!no-underline font-medium relative before:bg-neutral-300 dark:before:bg-neutral-500 before:absolute before:-left-0.5 before:-bottom-0.5 before:w-full before:h-2.5 before:-z-10 before:ease-in-out before:duration-300 before:hover:bottom-0 before:hover:h-full"
              >
                Read more
              </Link>
            ) : null}
            {post.date ? (
              <div className="text-base text-gray-400">
                <time>
                  {new Date(post.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
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

export function getStaticProps() {
  const allPosts = getAllPosts(["slug", "title", "excerpt", "date"]);
  return {
    props: { allPosts },
  };
}
