import { useSession } from 'next-auth/react';
import { api } from './api';

export const useUserRole = () => {
  const { data: sessionData } = useSession();
  const { data: user } = api.user.getUserById.useQuery(
    sessionData?.user.id as string
  );

  return { admin: user?.role === 'ADMIN', loading: false };
};
