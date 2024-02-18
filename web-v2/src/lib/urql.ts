import { Client, cacheExchange, createClient, fetchExchange } from "urql/core";

let _client: Client | null = null;

export const getUrqlClient = (ctx?: any) => {
  if (!_client) {
    _client = createClient({
      url: "http://localhost:4000/graphql",
      requestPolicy: "cache-and-network",
      fetchOptions: {
        credentials: "include",
      },
      exchanges: [cacheExchange, fetchExchange],
    });
  }
  const client = _client;

  return { client };
};
