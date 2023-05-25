import { type Session } from 'next-auth';
import { useSession, signIn, signOut } from 'next-auth/react';
import ProfileImage from 'components/ProfileImage';
import Container from 'components/Container';

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

export default function AdminAuth() {
  const { data: sessionData } = useSession();

  return (
    <Container>
      <div className="rounded-md border border-solid p-8">
        {sessionData ? (
          <div className="flex flex-col items-center justify-center gap-5">
            <ProfileImage
              imageURI={sessionData.user.image}
              username={sessionData.user.name}
            />
            <h3 className="!mt-0">{sessionData.user.name}</h3>
            <AuthButton sessionData={sessionData}>Sign out</AuthButton>
          </div>
        ) : (
          <div className="items-centers flex flex-row justify-center">
            <AuthButton sessionData={sessionData}>Sign in</AuthButton>
          </div>
        )}
      </div>
    </Container>
  );
}
