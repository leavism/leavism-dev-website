export default function CommentForm() {
	return (
		<textarea
			className="w-full m-3 rounded-lg border-2 border-solid border-neutral-200 p-3 outline-none focus:border-2 focus:border-neutral-400"
			placeholder="Leave a comment"
			rows={3}
			id="comment-field"
		>
		</textarea>
	)
}