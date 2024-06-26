import {
  LogoutMutation,
  MyUserDocument,
  MyUserQuery,
  SignInMutation,
  SignUpMutation,
} from "@/graphql/operations";
import { updateQuery } from "@/utils/updateQuery";
import { cacheExchange } from "@urql/exchange-graphcache";
import { dedupExchange, fetchExchange } from "urql";
import { isServer } from "./isServer";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/graphql";

export const urqlClient = (ssrExchange: any, ctx: any) => {
  let cookie = "";
  if (isServer()) {
    cookie = ctx?.req?.headers?.cookie;
  }

  return {
    url: API_URL,
    fetchOptions: {
      credentials: "include" as const,
      headers: cookie
        ? {
            cookie,
          }
        : undefined,
    },
    exchanges: [
      dedupExchange,
      cacheExchange({
        updates: {
          Mutation: {
            signin: (_result, args, cache, info) => {
              updateQuery<SignInMutation, MyUserQuery>(
                cache,
                { query: MyUserDocument },
                _result,
                (result, query) => {
                  return {
                    myUser: result.signin,
                  };
                }
              );
            },
            signup: (_result, args, cache, info) => {
              updateQuery<SignUpMutation, MyUserQuery>(
                cache,
                { query: MyUserDocument },
                _result,
                (result, query) => {
                  return {
                    myUser: result.signup,
                  };
                }
              );
            },
            logout: (_result, args, cache, info) => {
              updateQuery<LogoutMutation, MyUserQuery>(
                cache,
                { query: MyUserDocument },
                _result,
                () => ({ myUser: null })
              );
            },
          },
        },
      }),
      ssrExchange,
      fetchExchange,
    ],
  };
};
