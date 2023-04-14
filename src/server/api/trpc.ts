import { prisma } from "../db";
import { type CreateNextContextOptions } from "@trpc/server/adapters/next";

type CreateContextOptions = {
  prisma: typeof prisma
} & CreateNextContextOptions;

const createInnerTRPCContext = (_opts: CreateContextOptions) => {
  return {
    prisma,
    req: _opts.req,
    res: _opts.res
  };
};

export const createTRPCContext = (_opts: CreateNextContextOptions) => {
  return createInnerTRPCContext({
    req: _opts.req,
    res: _opts.res,
    prisma
  });
};

import { TRPCError, initTRPC } from "@trpc/server";
import superjson from "superjson";
import { ZodError } from "zod";
import verifySignedString from "../utils/verify-signed-string";

const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

const isAdmin = t.middleware(async ({ ctx: { req, res, prisma }, next }) => {
  const adminToken = req.cookies['adminAuthToken'];
  if (!adminToken) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "You are not logged in!"
    })
  };

  if (adminToken.split(":").length < 2) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "Invalid auth token!"
    })
  }

  const sessionToken = adminToken.split(":")[0];
  const signature = adminToken.split(":")[1];

  const adminSession = await prisma.adminSession.findUnique({
    where: {
      sessionToken
    },
    include: {
      adminUser: true
    }
  });
  if (!adminSession) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "Session does not exist!"
    })
  };

  // Verify if session has expired
  const now = Date.now();
  const sessionExpiration = adminSession.expires.getTime();
  if (now > sessionExpiration) {
    // Delete the expired session
    await prisma.adminSession.delete({
      where: {
        sessionToken,
      },
    });

    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "Session expired!",
    });
  };

  const isSignatureValid = verifySignedString(sessionToken, signature, adminSession.publicVerificationKey);
  if (!isSignatureValid) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "Auth token was modified!"
    })
  }

  return next({
    ctx: {
      prisma,
      req,
      res,
      adminSession
    }
  });
});

export const createTRPCRouter = t.router;
export const adminProcedure = t.procedure.use(isAdmin)
export const publicProcedure = t.procedure;