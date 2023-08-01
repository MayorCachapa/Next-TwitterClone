import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";

export const tweetRouter = createTRPCRouter({
  /* 
  tRPC allows us to access backend functionality from the frontend, allowing a more seamless and productive communication between
  the two
  */
  create: protectedProcedure
  .input(z.object({ content: z.string() }))
  .mutation(async ({input: {content}, ctx}) => {
    return await ctx.prisma.tweet.create({
      data: { content, userId: ctx.session.user.id },
    })
  })
});
