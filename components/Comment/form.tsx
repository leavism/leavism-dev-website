import { useSession } from 'next-auth/react';
import { api } from '../../src/utils/api'
import { type ChangeEvent, useState } from 'react';

export default function CommentForm() {
		const { data: sessionData } = useSession();
		const [content, setContent] = useState('');
		const postComment = api.comment.postComment.useMutation()

		function handleOnChange(event: ChangeEvent<HTMLInputElement>): void {
			setContent(event.target.value);
		}

		function handleSubmit() {
			if (sessionData){
				postComment.mutate({
					content,
					authorId: sessionData.user.id,
				})
			}
		}

		return (
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					className="w-full m-3 rounded-lg border-2 border-solid border-neutral-200 p-3 outline-none focus:border-2 focus:border-neutral-400"
					placeholder="Leave a comment"
					value={content}
					onChange={(event) => handleOnChange(event)}
					disabled={!sessionData}
				/>
				<input 
					className="flex h-fit justify-center rounded-md border border-solid px-4 py-1 transition-all duration-150 ease-out hover:-translate-x-1 hover:border-gray-700 hover:shadow-[3px_3px_0px] focus-visible:outline-offset-1 dark:border dark:hover:border-white"
					type="submit"/>
			</form>
		)
}