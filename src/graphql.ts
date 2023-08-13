import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

const API_URL =
  "https://api.studio.thegraph.com/query/51138/community-optimism-goerli/version/latest";

const client = new ApolloClient({
  uri: API_URL,
  cache: new InMemoryCache(),
});

const GET_COMMUNITY_USERS = gql`
  query GetCommunityUsers($communityId: String!) {
    community(id: $communityId) {
      id
      name
      symbol
      rulesURI
      members {
        id
        member
        tokenId
        dataURI
      }
    }
  }
`;

export { client, gql, GET_COMMUNITY_USERS };
