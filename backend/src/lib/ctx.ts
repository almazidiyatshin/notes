import { PrismaClient } from "@prisma/client";

export const CreateAppContext = () => {
  const prisma = new PrismaClient();
  return {
    prisma,
    stop: async () => {
      await prisma.$disconnect();
    },
  };
};

export type TAppContext = ReturnType<typeof CreateAppContext>;
