import { buildSchema, graphqlSync } from "graphql";

// Define GraphQL schema
const schema = buildSchema(`
  type Query {
    hello: String
  }
`);

// Define resolvers
const rootValue = {
  hello: () => "Hello from GraphQL!",
};

// Create Bun server with GraphQL endpoint
const server = Bun.serve({
  port: 3000,
  async fetch(req) {
    const url = new URL(req.url);

    if (url.pathname === "/graphql" && req.method === "POST") {
      const body = await req.json();
      const result = graphqlSync({
        schema,
        source: body.query,
        rootValue,
      });
      return new Response(JSON.stringify(result), {
        headers: { "Content-Type": "application/json" },
      });
    }

    if (url.pathname === "/" && req.method === "GET") {
      return new Response("GraphQL server running on /graphql");
    }

    return new Response("Not Found", { status: 404 });
  },
});

console.log(`GraphQL server running at http://localhost:${server.port}`);