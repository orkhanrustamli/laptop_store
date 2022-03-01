import startApolloServer from "./graphql-server";
import typeDefs from "./graphql/schema";
import resolvers from "./graphql/resolvers";

(async function () {
    await startApolloServer(typeDefs, resolvers);
})();
