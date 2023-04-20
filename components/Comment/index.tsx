import Container from "components/Container";
import { useSession, signIn, signOut } from "next-auth/react";
import CommentForm from "components/Comment/form";
import Image from "next/image";

export default function Comment() {
  const { data: sessionData } = useSession();

  return (
    <Container>
      {sessionData ? (
        <>
					<div className="flex flex-row items-center justify-end gap-5">
						{sessionData.user.image ? (
							<Image
								src={sessionData.user.image}
								width={64}
								height={64}
								className="rounded-full !m-0"
								alt=""
							/>
						) : null}
						<button
							onClick={sessionData ? () => void signOut() : () => void signIn()}
							className="flex justify-center h-fit rounded-md border border-solid px-4 py-1 transition-all duration-150 ease-out hover:-translate-x-1 hover:border-gray-700 hover:shadow-[3px_3px_0px] focus-visible:outline-offset-1 dark:border dark:hover:border-white"
						>
							{"Sign out"}
						</button>
					</div>
          <CommentForm />
        </>
      ) : (
        <button
          onClick={sessionData ? () => void signOut() : () => void signIn()}
          className="flex justify-center rounded-full border border-solid border-transparent px-4 py-1 transition-all duration-150 ease-out hover:-translate-x-1 hover:border-gray-700 hover:shadow-[3px_3px_0px] focus-visible:outline-offset-1 dark:border dark:hover:border-white"
        >
          {"Sign in to comment"}
        </button>
      )}
    </Container>
  );
}
