import { z } from "zod";
import { createTRPCRouter, publicProcedure, adminProcedure } from "../trpc";
import generateKeyPair from "@/server/utils/generate-key-pair";
import createSignedString from "@/server/utils/create-signed-string";

export const productsRouter = createTRPCRouter({
  getProducts: publicProcedure.query(async ({ ctx: { prisma } }) => {
    const products = await prisma.product.findMany();

    return products;
  }),
  createProduct: adminProcedure.input(z.object({
    name: z.string(),
    price: z.number().min(1),
    types: z.string().array(),
    images: z.string().array()
  })).mutation(async ({ ctx: { prisma }, input }) => {
    const linkedNamePrice = `${input.name}:${input.price}`;
    const { privateKey, publicKey } = generateKeyPair();
    const namePriceLinkSignature = createSignedString(linkedNamePrice, { privateKey, publicKey });

    const allTypes = await prisma.type.findMany({
      where: {
        name: {
          in: input.types
        }
      }
    });

    let existingTypes: string[] = [];
    let newTypes: string[] = [];

    input.types.forEach((type) => {
      const idx = allTypes.findIndex((prevType) => prevType.name === type);
      const existing = idx !== -1;

      if (!existing) {
        newTypes.push(type);
      } else {
        existingTypes.push(allTypes[idx].id)
      }
    })

    const newProduct = await prisma.product.create({
      data: {
        name: input.name,
        price: input.price,
        publicPriceNameVerificationKey: publicKey,
        verificationKey: namePriceLinkSignature.signature,
        types: {
          connect: existingTypes.map((typeId) => ({ id: typeId })),
          create: newTypes.map((typeName) => ({
            name: typeName
          }))
        }
      }
    });

    return newProduct;
  })
})