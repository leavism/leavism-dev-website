import { useRouter } from 'next/router';
import { api } from '~/utils/api';
import distanceToNow from 'lib/util/dateRelative';
import { type Comment } from 'lib/util/interface';
import ProfileImage from 'components/ProfileImage';

function Comment({ key: id, authorId, content, createdAt }: Comment) {
  const { data: author } = api.user.getUserById.useQuery(authorId);

  return (
    <>
      <div key={id} className="flex flex-row items-center gap-5">
        <ProfileImage imageURI={author?.image} username={author?.name} />
        <div className="flex flex-col gap-2 leading-6">
          <div className="flex flex-row items-center gap-2">
            <div className="font-semibold">{author?.name}</div>
            <time className="text-sm font-light">
              {distanceToNow(new Date(createdAt))}
            </time>
          </div>
          <div>{content}</div>
        </div>
      </div>
    </>
  );
}

export default function CommentList() {
  const router = useRouter();
  const blogRouter = api.blog.getBlogBySlug;
  const { data: blog } = blogRouter.useQuery({
    slug: router.query.slug as string,
  });

  const { data: comments } = api.comment.listComments.useQuery({
    blogId: blog?.id ?? -1,
  });

  return (
    <>
      <div className="m-1 grid grid-flow-row gap-6">
        {comments?.map((comment) => (
          <Comment
            key={comment.id}
            authorId={comment.authorId}
            content={comment.content}
            createdAt={comment.createdAt}
          />
        ))}
      </div>
    </>
  );
}
