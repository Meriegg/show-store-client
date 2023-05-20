// This function prevents supabase from pausing the project

import { prisma } from "@/server/db"
import type { NextApiResponse } from "next"

export default async (_: any, res: NextApiResponse) => {
  await prisma.product.findMany();

  res.status(200).json({
    message: "OK"
  })
}