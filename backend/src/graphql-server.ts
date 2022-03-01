import { ApolloServer } from "apollo-server-fastify";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { constraintDirective, constraintDirectiveTypeDefs } from "graphql-constraint-directive";
import { ApolloServerPlugin } from "apollo-server-plugin-base";
import { FastifyInstance } from "fastify";

import app from "./app";

function fastifyAppClosePlugin(app: FastifyInstance): ApolloServerPlugin {
    return {
        async serverWillStart() {
            return {
                async drainServer() {
                    await app.close();
                },
            };
        },
    };
}

async function startApolloServer(typeDefs: any, resolvers: any) {
    let schema = makeExecutableSchema({ typeDefs: [constraintDirectiveTypeDefs, typeDefs], resolvers });
    schema = constraintDirective()(schema);

    const server = new ApolloServer({
        schema,
        context: ({ request, reply }) => {
            return { request, reply };
        },
        plugins: [fastifyAppClosePlugin(app), ApolloServerPluginDrainHttpServer({ httpServer: app.server })],
    });

    await server.start();
    app.register(server.createHandler());
    await app.listen(2927, "0.0.0.0");
    console.log(`🚀 Server ready at http://localhost:2927${server.graphqlPath}`);
}

export default startApolloServer;
