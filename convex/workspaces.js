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

export const updateWorkspace = mutation({
  args: {
    id: v.id("workspaces"),
    prompt: v.any(),
  },
  handler: async (ctx, args) => {
    const workspace = await ctx.db.get(args.id);
    if (!workspace) {
      throw new Error("Workspace not found");
    }
    return ctx.db.patch(args.id, {
      prompt: args.prompt,
    });
  },
});

export const updateProjectFiles = mutation({
  args: {
    id: v.id("workspaces"),
    files: v.any(),
  },
  handler: async (ctx, args) => {
    const workspace = await ctx.db.get(args.id);
    if (!workspace) {
      throw new Error("Workspace not found");
    }
    return ctx.db.patch(args.id, {
      fileData: args.files,
    });
  },
});