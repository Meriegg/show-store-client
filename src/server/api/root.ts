import { createTRPCRouter } from "@/server/api/trpc";
import { productsRouter } from "./routers/products";
import { typesRouter } from "./routers/types";

export const appRouter = createTRPCRouter({
  products: productsRouter,
  types: typesRouter
});

export type AppRouter = typeof appRouter;