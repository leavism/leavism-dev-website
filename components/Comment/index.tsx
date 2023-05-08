import CommentAuth from './AuthButton';
import CommentDisplay from './Display';
import CommentForm from './Form';

export default function Comment() {
  return (
    <>
      <CommentAuth />
      <CommentForm />
      <CommentDisplay />
    </>
  );
}
