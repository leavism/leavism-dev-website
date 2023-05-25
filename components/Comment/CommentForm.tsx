import { useSession } from 'next-auth/react';
import { FormEvent, useState } from 'react';
import { useRouter } from 'next/router';
import { api } from '~/utils/api';

export default function CommentForm() {
  const router = useRouter();
  const [content, setContent] = useState('');
  const { data: sessionData } = useSession();
  const postComment = api.comment.postComment.useMutation();
  const { data: blog } = api.blog.getBlogBySlug.useQuery({
    slug: router.query.slug as string,
  });

  function handleOnChange(event: React.ChangeEvent<HTMLInputElement>) {
    setContent(event.target.value);
  }

  function handleSubmit() {
    postComment.mutate({
      content,
      authorId: sessionData?.user.id ?? '-1',
      blogId: blog?.id ?? -1,
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className="m-3 w-full rounded-lg border-2 border-solid border-neutral-300 p-3 outline-none focus:border-2 focus:border-neutral-400 dark:bg-neutral-600"
        placeholder={sessionData ? 'Leave a comment' : 'Sign in to comment'}
        value={content}
        onChange={(event) => handleOnChange(event)}
        disabled={!sessionData}
        minLength={2}
        maxLength={150}
      />
      <input
        className="ml-auto flex h-fit justify-center rounded-md border border-solid border-neutral-500 px-4 py-1 transition-all duration-150 ease-out hover:-translate-x-1 hover:border-gray-700 hover:shadow-[3px_3px_0px] focus-visible:outline-offset-1 disabled:text-neutral-400 disabled:hover:translate-x-0 disabled:hover:border-neutral-200 disabled:hover:shadow-none dark:border dark:hover:border-white"
        type="submit"
        disabled={!sessionData}
      />
    </form>
  );
}
