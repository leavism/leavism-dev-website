import { z } from 'zod';
import { adminProcedure, createTRPCRouter, publicProcedure } from '../trpc';

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
  postBlog: adminProcedure
    .input(
      z.object({
        title: z.string(),
        slug: z.string(),
        authorId: z.string(),
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
            authorId: input.authorId,
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
  editBlogContent: adminProcedure
    .input(
      z.object({
        slug: z.string(),
        content: z.string(),
      })
    )
    .mutation(async (opts) => {
      const { input, ctx } = opts;
      try {
        await ctx.prisma.blog.update({
          where: {
            slug: input.slug,
          },
          data: {
            content: input.content,
          },
        });
      } catch (error) {
        console.log(error);
      }
    }),
  editBlog: adminProcedure
    .input(
      z.object({
        title: z.string(),
        oldSlug: z.string(),
        newSlug: z.string(),
        authorId: z.string(),
        content: z.string(),
        description: z.string(),
      })
    )
    .mutation(async (opts) => {
      const { input, ctx } = opts;
      try {
        await ctx.prisma.blog.update({
          where: {
            slug: input.oldSlug,
          },
          data: {
            title: input.title,
            slug: input.newSlug,
            authorId: input.authorId,
            content: input.content,
            description: input.description,
          },
        });
      } catch (error) {
        console.log(error);
      }
    }),
  editBlogDescription: adminProcedure
    .input(
      z.object({
        slug: z.string(),
        description: z.string(),
      })
    )
    .mutation(async (opts) => {
      const { input, ctx } = opts;
      try {
        await ctx.prisma.blog.update({
          where: {
            slug: input.slug,
          },
          data: {
            description: input.description,
          },
        });
      } catch (error) {
        console.log(error);
      }
    }),
  editBlogTitle: adminProcedure
    .input(
      z.object({
        slug: z.string(),
        title: z.string(),
      })
    )
    .mutation(async (opts) => {
      const { input, ctx } = opts;
      try {
        await ctx.prisma.blog.update({
          where: {
            slug: input.slug,
          },
          data: {
            title: input.title,
            slug: input.title.replaceAll('', '-'),
          },
        });
      } catch (error) {
        console.log(error);
      }
    }),
  deleteBlog: adminProcedure
    .input(
      z.object({
        slug: z.string(),
      })
    )
    .mutation(async (opts) => {
      const { input, ctx } = opts;
      try {
        await ctx.prisma.blog.delete({
          where: {
            slug: input.slug,
          },
        });
      } catch (error) {
        console.log(error);
      }
    }),
});
