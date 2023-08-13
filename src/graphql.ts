import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

const API_URL =
  "https://api.studio.thegraph.com/proxy/11763/community-optimism-goerli/version/latest/";

const client = new ApolloClient({
  uri: API_URL,
  cache: new InMemoryCache(),
});

export { client, gql };
