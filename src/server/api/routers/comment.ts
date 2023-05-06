import { z } from 'zod';
import { createTRPCRouter, protectedProcedure, publicProcedure} from '../trpc';

export const CommentRouter = createTRPCRouter({
	getAll: publicProcedure.query(async ({ ctx }) => {
		try {
			// eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
			return await ctx.prisma.comment.findMany({
				select: {
					id: true,
					authorId: true,
					content: true
				}
			})
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
				// eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
				await ctx.prisma.comment.create({
					data: {
						content: input.content,
						authorId: ctx.session.user.id,
						// postId: input.postId
					}
				})
			} catch (error) {
				console.log(error);
			}
		})
})