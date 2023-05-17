import { z } from 'zod';
import { createTRPCRouter, protectedProcedure, publicProcedure } from '../trpc';

export const BlogRouter = createTRPCRouter({
  listBlog: publicProcedure.query(async ({ ctx }) => {
    try {
      const blog = await ctx.prisma.blog.findMany({
        select: {
          id: true,
          title: true,
          slug: true,
          authorId: true,
          description: true,
          createdAt: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });
      return blog;
    } catch (error) {
      console.log(error);
    }
  }),
  postBlog: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        slug: z.string(),
        authordId: z.string(),
        content: z.string(),
        description: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.prisma.blog.create({
          data: {
            title: input.title,
            slug: input.slug,
            authorId: input.authordId,
            content: input.content,
            description: input.description,
          },
        });
      } catch (error) {
        console.log(error);
      }
    }),
  getBlogBySlug: publicProcedure
    .input(
      z.object({
        slug: z.string(),
      })
    )
    .query(async (opts) => {
      const { input, ctx } = opts;
      try {
        const blog = await ctx.prisma.blog.findUnique({
          where: {
            slug: input.slug,
          },
        });
        return blog;
      } catch (error) {
        console.log(error);
      }
    }),
});
