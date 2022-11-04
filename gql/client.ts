import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
  uri: "https://enthusiastic-sweatsuit-jay.cyclic.app/graphql",
  cache: new InMemoryCache(),
});
