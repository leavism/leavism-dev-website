import CommentAuth from './authbutton';
import CommentList from './list';
import CommentForm from './form';

export default function Comment() {
  return (
    <>
      <CommentAuth />
      <CommentForm />
      <CommentList />
    </>
  );
}
