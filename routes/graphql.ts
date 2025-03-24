import {
  graphql,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  buildSchema,
} from "graphql";
import { createHandler } from "graphql-http/lib/use/express";

// const { buildSchema } = require("graphql");
// const { createHandler } = require("graphql-http/lib/use/express");

// const schema = buildSchema(`type Query { hello: String }`);

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "user",
    fields: {
      name: {
        type: GraphQLString,
        resolve: () => "Insert Name",
      },
    },
  }),
});

const rootValue = {
  hello() {
    return "Hello world!";
  },
};

const graphqlHandler = createHandler({
  schema,
});

// module.exports = graphqlHandler;
export default graphqlHandler;
