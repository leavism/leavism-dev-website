import { api } from '~/utils/api';

export default function CommentDisplay() {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { data: comments } = api.comment.listComment.useQuery();

  return (
    <>
      {comments?.map((comment) => (
        <Comment
          key={comment.id}
          authorId={comment.authorId}
          content={comment.content}
        />
      ))}
    </>
  );
}

type CommentProps = {
  key: number;
  authorId: string;
  content: string;
};

function Comment({ key: id, authorId, content }: CommentProps) {
  const { data: author } = api.user.getById.useQuery(authorId);
  return (
    <p key={id}>
      {author?.name} : {content}
    </p>
  );
}
