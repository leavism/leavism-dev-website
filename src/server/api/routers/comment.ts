import { z } from 'zod';
import { createTRPCRouter, protectedProcedure, publicProcedure } from '../trpc';

export const commentRouter = createTRPCRouter({
  listComment: publicProcedure.query(async ({ ctx }) => {
    try {
      const comments = await ctx.prisma.comment.findMany({
        select: {
          id: true,
          authorId: true,
          content: true,
          createdAt: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });
      return comments;
    } catch (error) {
      console.log(error);
    }
  }),
  postComment: protectedProcedure
    .input(
      z.object({
        content: z.string(),
        authorId: z.string(),
        // postId: z.number()
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.prisma.comment.create({
          data: {
            content: input.content,
            authorId: ctx.session.user.id,
            // postId: input.postId
          },
        });
      } catch (error) {
        console.log(error);
      }
    }),
});
