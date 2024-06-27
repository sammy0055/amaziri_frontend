"use client"
import { ApolloProvider } from "@apollo/client";
import { client } from ".";

export const ApolloProviderClient = (props: any) => {
  return <ApolloProvider client={client}>{props.children}</ApolloProvider>;
};
