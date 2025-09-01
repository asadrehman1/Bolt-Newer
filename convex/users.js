import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const createUser = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    picture: v.string(),
    uid: v.string(),
  },
  handler: async (ctx, args) => {
    // If user already exists, return the existing user
    const existingUser = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("email"), args.email))
      .first();
    if (existingUser) {
      return existingUser;
    }
    const { name, email, picture, uid } = args;
    return ctx.db.insert('users', {
      name,
      email,
      picture,
      uid,
      tokens: 50000,
    });
  },
});

export const getUser = query({
  args: {
    email: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("email"), args.email))
      .first();
    return user;
  },
});

export const updateTokens = mutation({
  args: {
    id: v.id("users"),
    tokens: v.number(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("id"), args.id))
      .first();
    if (!user) {
      throw new Error("User not found");
    }
    return ctx.db.patch(args.id, {
      tokens: args.tokens,
    });
  },
});