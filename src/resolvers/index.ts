import Query from "./queries";
import { Resolvers } from "src/generated/graphql";
import Context from "src/context";

export const resolvers: Resolvers<Context> = {
  Query,
};
