import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { api } from '~/utils/api';
import ErrorPage from 'next/error';

export default function CommentForm() {
  const router = useRouter();
  const [content, setContent] = useState('');
  const { data: sessionData } = useSession();
  const { data: blog } = api.blog.getBlogBySlug.useQuery({
    slug: router.query.slug as string,
  });

  function handleOnChange(event: React.ChangeEvent<HTMLInputElement>) {
    setContent(event.target.value);
  }

  function handleSubmit() {
    if (!blog) return <ErrorPage statusCode={400} />;
    if (!sessionData) return <ErrorPage statusCode={400} />;

    const postComment = api.comment.postComment.useMutation();
    postComment.mutate({
      content,
      authorId: sessionData.user.id,
      blogId: blog.id,
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className="m-3 w-full rounded-lg border-2 border-solid border-neutral-200 p-3 outline-none focus:border-2 focus:border-neutral-400 dark:bg-neutral-600"
        placeholder={sessionData ? 'Leave a comment' : 'Sign in to comment'}
        value={content}
        onChange={(event) => handleOnChange(event)}
        disabled={!sessionData}
      />
      <input
        className="ml-auto flex h-fit justify-center rounded-md border border-solid px-4 py-1 transition-all duration-150 ease-out hover:-translate-x-1 hover:border-gray-700 hover:shadow-[3px_3px_0px] focus-visible:outline-offset-1 dark:border dark:hover:border-white"
        type="submit"
        disabled={!sessionData}
      />
    </form>
  );
}
