import { PrismaClient } from "@prisma/client";
import { YogaInitialContext } from "@graphql-yoga/node";


export default interface Context extends YogaInitialContext {
  prisma: PrismaClient;
}
