import { type Session } from 'next-auth';
import { useSession, signIn, signOut } from 'next-auth/react';
import Image from 'next/image';

type authButtonProps = {
  sessionData: Session | null;
  children: React.ReactNode;
};

function AuthButton({ sessionData, children }: authButtonProps) {
  return (
    <button
      onClick={sessionData ? () => void signOut() : () => void signIn()}
      className="flex h-fit justify-center rounded-md border border-solid px-4 py-1 transition-all duration-150 ease-out hover:-translate-x-1 hover:border-gray-700 hover:shadow-[3px_3px_0px] focus-visible:outline-offset-1 dark:border dark:hover:border-white"
    >
      {children}
    </button>
  );
}

export default function CommentAuth() {
  const { data: sessionData } = useSession();

  return (
    <>
      {sessionData ? (
        <div className="flex flex-row items-center justify-end gap-5">
          {sessionData.user.image ? (
            <Image
              src={sessionData.user.image}
              width={64}
              height={64}
              className="!m-0 rounded-full"
              alt=""
            />
          ) : null}
          <AuthButton sessionData={sessionData}>Sign out</AuthButton>
        </div>
      ) : (
        <div className="items-centers flex flex-row justify-end">
          <AuthButton sessionData={sessionData}>Sign in</AuthButton>
        </div>
      )}
    </>
  );
}
