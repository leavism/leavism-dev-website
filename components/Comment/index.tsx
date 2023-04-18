import Container from "components/Container"
import { useSession, signIn, signOut } from "next-auth/react";
import CommentForm from "components/Comment/form";
import Image from "next/image";

export default function Comment() {
	const { data: sessionData } = useSession();
	console.log(sessionData?.user.image)
	return (
		<Container>
			{sessionData ? (
				<>
					<button
						onClick={sessionData ? () => void signOut() : () => void signIn()}
						className="border border-solid border-transparent px-4 py-1 rounded-full flex justify-center transition-all duration-150 ease-out hover:shadow-[3px_3px_0px] hover:-translate-x-1 hover:border-gray-700 dark:hover:border-white dark:border focus-visible:outline-offset-1"
					>
						{"Sign out"}
					</button>
					<CommentForm/>
				</>
			) : 
				<button
					onClick={sessionData ? () => void signOut() : () => void signIn()}
					className="border border-solid border-transparent px-4 py-1 rounded-full flex justify-center transition-all duration-150 ease-out hover:shadow-[3px_3px_0px] hover:-translate-x-1 hover:border-gray-700 dark:hover:border-white dark:border focus-visible:outline-offset-1"
				>
					{"Sign in to comment"}
				</button>
			}


		</Container>
	)
}