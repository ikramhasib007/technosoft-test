import * as dotenv from "dotenv";
dotenv.config();

import { useExtendContext } from "@envelop/core";
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import { loadSchemaSync } from "@graphql-tools/load";
import { createServer } from "@graphql-yoga/node";
import Context from "./context";
import { resolvers } from "./resolvers";
import prisma from "./prisma";

const typeDefs = loadSchemaSync("./**/*.graphql", {
  loaders: [new GraphQLFileLoader()],
});

const server = createServer<Context, any>({
  cors: {
    origin: ["http://localhost:3000"],
    credentials: true,
    allowedHeaders: ["X-Custom-Header", "Authorization", "content-type"],
    methods: ["POST"],
  },
  schema: {
    typeDefs,
    resolvers,
  },
  logging: true,
  plugins: [useExtendContext(() => ({ prisma }))],
  graphiql: process.env.NODE_ENV === "development",
  multipart: false
});

server.start().then(() => {
  console.log(`🚀 Server ready`);
});
