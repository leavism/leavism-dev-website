import { api } from '~/utils/api';
import Image from 'next/image';
import distanceToNow from 'lib/util/dateRelative';

export default function CommentList() {
  const { data: comments } = api.comment.listComment.useQuery();
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

type CommentProps = {
  key: number;
  authorId: string;
  content: string;
  createdAt: Date;
};

function Comment({ key: id, authorId, content, createdAt }: CommentProps) {
  const { data: author } = api.user.getById.useQuery(authorId);
  return (
    <>
      <div key={id} className="flex flex-row items-center gap-5">
        <Image
          src={author?.image ?? ''}
          width={54}
          height={54}
          className="!m-0 rounded-full"
          alt={`${author?.name || 'Someone'}'s profile picture`}
        />
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
