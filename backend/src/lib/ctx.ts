import { createPrismaClient } from "./prisma.js";

export const CreateAppContext = () => {
  const prisma = createPrismaClient();
  return {
    prisma,
    stop: async () => {
      await prisma.$disconnect();
    },
  };
};

export type TAppContext = ReturnType<typeof CreateAppContext>;
