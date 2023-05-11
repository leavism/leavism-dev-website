import { useSession } from 'next-auth/react';
import { api } from '~/utils/api';
import { type ChangeEvent, useState } from 'react';
import { useRouter } from 'next/router';

export default function CommentForm() {
  const { data: sessionData } = useSession();
  const [content, setContent] = useState('');
  const router = useRouter();
  const postComment = api.comment.postComment.useMutation();
  const postRouter = api.post.getPostBySlug;
  const { data: post } = postRouter.useQuery({ slug: router.query.slug });

  function handleOnChange(event: ChangeEvent<HTMLInputElement>): void {
    setContent(event.target.value);
  }

  function handleSubmit(): void {
    if (sessionData) {
      postComment.mutate({
        content,
        authorId: sessionData.user.id,
        postId: post?.id ?? -1,
      });
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className="m-3 w-full rounded-lg border-2 border-solid border-neutral-200 p-3 outline-none focus:border-2 focus:border-neutral-400"
        placeholder={sessionData ? 'Leave a comment' : 'Sign in to comment'}
        value={content}
        onChange={(event) => handleOnChange(event)}
        disabled={!sessionData}
      />
      <input
        className="ml-auto flex h-fit justify-center rounded-md border border-solid px-4 py-1 transition-all duration-150 ease-out focus-visible:outline-offset-1 enabled:hover:-translate-x-1 enabled:hover:border-gray-700 enabled:hover:shadow-[3px_3px_0px]  disabled:text-neutral-600 dark:border dark:hover:border-white"
        type="submit"
        disabled={!sessionData}
      />
    </form>
  );
}
