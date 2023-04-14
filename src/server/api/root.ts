import { createTRPCRouter } from "@/server/api/trpc";
import { productsRouter } from "./routers/products";
import { typesRouter } from "./routers/types";
import { adminAuthRouter } from "./routers/admin/auth";
import { adminDataRouter } from "./routers/admin/data";
import { orderRouter } from "./routers/admin/orders";

export const appRouter = createTRPCRouter({
  products: productsRouter,
  types: typesRouter,
  admin: createTRPCRouter({
    auth: adminAuthRouter,
    data: adminDataRouter,
    orders: orderRouter,
  })
});

export type AppRouter = typeof appRouter;