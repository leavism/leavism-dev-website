import { prisma } from '~/server/db';
import { appRouter } from '../root';
import { createServerSideHelpers } from '@trpc/react-query/server';
import SuperJSON from 'superjson';

export const generateSSGHelper = () =>
  createServerSideHelpers({
    router: appRouter,
    ctx: { prisma, session: null },
    transformer: SuperJSON,
  });
