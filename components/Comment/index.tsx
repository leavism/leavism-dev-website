import CommentAuth from './AuthButton';
import CommentList from './List';
import CommentForm from './Form';

export default function Comment() {
  return (
    <>
      <CommentAuth />
      <CommentForm />
      <CommentList />
    </>
  );
}
