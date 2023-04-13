/*
  If I had 1 dollar for every hour and 404 error I got just because
  I was using the `app` directory api instead of the `pages` directory api
  I would be able to buy a bag of chips and a fucking mansion :D
*/

import { createNextApiHandler } from "@trpc/server/adapters/next";

import { createTRPCContext } from "@/server/api/trpc";
import { appRouter } from "@/server/api/root";

// export API handler
export default createNextApiHandler({
  router: appRouter,
  createContext: createTRPCContext,
});