import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const createWorkspace = mutation({
  args: {
    prompt: v.any(),
    user: v.id("users"),
  },
  handler: async (ctx, args) => {
    const { prompt, user } = args;
    return ctx.db.insert("workspaces", {
      prompt,
      user,
    });
  },
});

export const getWorkspace = query({
  args: {
    id: v.id("workspaces"),
  },
  handler: async (ctx, args) => {
    const workspace = await ctx.db.get(args.id);
    return workspace;
  },
});