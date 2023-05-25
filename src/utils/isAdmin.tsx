import { type GetServerSidePropsContext } from 'next';
import { getServerAuthSession } from '~/server/auth';

export default function isAdmin(checkAdmin: {
  (arg0: GetServerSidePropsContext): unknown;
  checkAdmin?: () => { props: unknown };
}) {
  return async (context: GetServerSidePropsContext) => {
    const session = await getServerAuthSession(context);
    if (session?.user.role !== 'ADMIN') {
      return {
        redirect: {
          destination: '/enter',
          permanent: false,
        },
      };
    }
    return await checkAdmin(context);
  };
}
