import { useQuery } from "@apollo/client";
import { GET_COMMUNITY_USERS } from "../graphql";

function useFetchCommunityUsers(contractAddress: `0x${string}`) {
  const data = useQuery(GET_COMMUNITY_USERS, {
    variables: {
      communityId: contractAddress,
    },
  });

  return data;
}

export { useFetchCommunityUsers };
