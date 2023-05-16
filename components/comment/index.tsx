import CommentAuth from './CommentAuthButton';
import CommentList from './CommentList';
import CommentForm from './CommentForm';

export default function Comment() {
  return (
    <>
      <CommentAuth />
      <CommentForm />
      <CommentList />
    </>
  );
}
