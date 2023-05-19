import { useSession } from 'next-auth/react';
import { api } from './api';

export const useUserRole = () => {
  const { data: sessionData } = useSession();
  const { data: user } = api.user.getById.useQuery(
    sessionData?.user.id as string
  );

  return { admin: user?.role === 'ADMIN', loading: false };
};
