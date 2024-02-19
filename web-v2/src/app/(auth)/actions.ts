"use server";

import {
  SignInDocument,
  SignInMutation,
  SignInMutationVariables,
} from "@/graphql/operations";
import { getUrqlClient } from "@/lib/urql";

const { client } = getUrqlClient();

export const signin = async () => {
  const response = await client.mutation<
    SignInMutation,
    SignInMutationVariables
  >(SignInDocument, { email: "will@example.com", password: "password9" });

  console.log(response);

  return "test";
};
