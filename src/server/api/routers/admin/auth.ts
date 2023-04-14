import generateKeyPair from '@/server/utils/generate-key-pair';
import createSignedString from '@/server/utils/create-signed-string';
import { setCookie, deleteCookie } from 'cookies-next';
import { v4 as uuidv4 } from 'uuid'
import { z } from "zod";
import { createTRPCRouter, publicProcedure, adminProcedure } from "../../trpc";
import { TRPCError } from "@trpc/server";
import * as argon from 'argon2'
import createSessionExpiration from '@/server/utils/create-session-expiration';
import { sessionExpirationDelay } from '@/constants';
import { env } from '@/env.mjs';

export const adminAuthRouter = createTRPCRouter({
  login: publicProcedure.input(z.object({
    name: z.string(),
    password: z.string()
  })).mutation(async ({ ctx: { prisma, res, req }, input: { name, password } }) => {
    // Verify if the user exists
    const adminUser = await prisma.adminUser.findUnique({
      where: {
        name
      }
    });
    if (!adminUser) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "This admin user does not exist!"
      })
    };

    // An admin account can either have a public password or a hashed password
    // if a password is public just check if the strings match
    // else use argon to verify the passwords match
    const isPassCorrect = adminUser.passwordType === "public" ?
      password === adminUser.password :
      await argon.verify(adminUser.password, password, { saltLength: 16 })
    if (!isPassCorrect) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "Incorrect password!"
      })
    }

    // Create a new random session token
    const sessionToken = uuidv4();

    // Create a private/public key pair used to verify the session token
    const { privateKey, publicKey } = generateKeyPair()

    // Sign the session token
    const signedSessionToken = createSignedString(sessionToken, { privateKey, publicKey });

    // Create a new auth token containing the original session token and the signed
    // session token, this prevents modifying the session token
    const adminAuthToken = `${sessionToken}:${signedSessionToken.signature}`;

    const sessionExpiration = createSessionExpiration(sessionExpirationDelay)

    const newSession = await prisma.adminSession.create({
      data: {
        expires: sessionExpiration,
        publicVerificationKey: publicKey,
        sessionToken,
        adminId: adminUser.id,
      }
    });

    setCookie("adminAuthToken", adminAuthToken, {
      httpOnly: true,
      secure: env.NODE_ENV === "production" ? true : false,
      sameSite: true,
      expires: sessionExpiration,
      req,
      res,
    })

    return { newSession, adminAuthToken }
  }),
  logout: adminProcedure.mutation(async ({ ctx: { prisma, adminSession, req, res } }) => {
    deleteCookie("adminAuthToken", {
      httpOnly: true,
      secure: env.NODE_ENV === "production" ? true : false,
      sameSite: true,
      req,
      res,
    });

    const deletedSession = await prisma.adminSession.delete({
      where: {
        id: adminSession.id
      }
    });

    return deletedSession
  })
})