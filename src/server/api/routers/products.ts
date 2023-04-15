import { z } from "zod";
import { createTRPCRouter, publicProcedure, adminProcedure } from "../trpc";
import generateKeyPair from "@/server/utils/generate-key-pair";
import createSignedString from "@/server/utils/create-signed-string";
import { TRPCError } from "@trpc/server";

export const productsRouter = createTRPCRouter({
  getProducts: publicProcedure.query(async ({ ctx: { prisma } }) => {
    const products = await prisma.product.findMany({
      include: {
        types: true
      }
    });

    return products;
  }),
  getProduct: publicProcedure.input(z.object({ id: z.string() })).query(async ({ ctx: { prisma }, input: { id } }) => {
    console.log(id)
    const product = await prisma.product.findUnique({
      where: {
        id
      },
      include: {
        types: true
      }
    });
    if (!product) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "This product does not exist!"
      })
    };

    return product;
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
        images: input.images,
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
  }),
  updateProduct: adminProcedure.input(z.object({
    name: z.string(),
    price: z.number().min(1),
    types: z.string().array(),
    images: z.string().array(),
    id: z.string()
  })).mutation(async ({ ctx: { prisma }, input: { types, id, ...input } }) => {
    const linkedNamePrice = `${input.name}:${input.price}`;
    const { privateKey, publicKey } = generateKeyPair();
    const namePriceLinkSignature = createSignedString(linkedNamePrice, { privateKey, publicKey });

    const allTypes = await prisma.type.findMany({
      where: {
        name: {
          in: types
        }
      }
    });

    let existingTypes: string[] = [];
    let newTypes: string[] = [];

    const prevProduct = await prisma.product.findUnique({
      where: {
        id
      },
      include: {
        types: true
      }
    });
    if (!prevProduct) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "This product does not exist or has probably been deleted!"
      })
    };

    let deletedTypesId: string[] = [];

    prevProduct.types.forEach((type) => {
      const idx = types.findIndex((prevType) => prevType === type.name);
      const doesExist = idx !== -1;

      if (!doesExist) {
        deletedTypesId.push(type.id)
      }
    })

    types.forEach((type) => {
      const idx = allTypes.findIndex((prevType) => prevType.name === type);
      const existing = idx !== -1;

      if (!existing) {
        newTypes.push(type);
      } else {
        existingTypes.push(allTypes[idx].id)
      }
    })

    const updatedProduct = await prisma.product.update({
      where: {
        id
      },
      data: {
        publicPriceNameVerificationKey: publicKey,
        verificationKey: namePriceLinkSignature.signature,
        types: {
          connect: existingTypes.map((typeId) => ({ id: typeId })),
          create: newTypes.map((typeName) => ({
            name: typeName
          })),
          disconnect: deletedTypesId.map((typeId) => ({ id: typeId }))
        },
        ...input,
      }
    });

    return updatedProduct;
  })
})