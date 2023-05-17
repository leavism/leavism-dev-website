import { createTRPCRouter } from '~/server/api/trpc';
import { commentRouter } from './routers/comment';
import { userRouter } from './routers/user';
import { BlogRouter } from './routers/blog';

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  comment: commentRouter,
  user: userRouter,
  blog: BlogRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
