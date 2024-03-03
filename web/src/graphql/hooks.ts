import * as Operations from './operations';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;


export function useMyUserQuery(options?: Omit<Urql.UseQueryArgs<Operations.MyUserQueryVariables>, 'query'>) {
  return Urql.useQuery<Operations.MyUserQuery, Operations.MyUserQueryVariables>({ query: Operations.MyUserDocument, ...options });
};

export function useSignUpMutation() {
  return Urql.useMutation<Operations.SignUpMutation, Operations.SignUpMutationVariables>(Operations.SignUpDocument);
};

export function useSignInMutation() {
  return Urql.useMutation<Operations.SignInMutation, Operations.SignInMutationVariables>(Operations.SignInDocument);
};

export function useGetUserCookbooksQuery(options?: Omit<Urql.UseQueryArgs<Operations.GetUserCookbooksQueryVariables>, 'query'>) {
  return Urql.useQuery<Operations.GetUserCookbooksQuery, Operations.GetUserCookbooksQueryVariables>({ query: Operations.GetUserCookbooksDocument, ...options });
};

export function useGetCookbookQuery(options: Omit<Urql.UseQueryArgs<Operations.GetCookbookQueryVariables>, 'query'>) {
  return Urql.useQuery<Operations.GetCookbookQuery, Operations.GetCookbookQueryVariables>({ query: Operations.GetCookbookDocument, ...options });
};

export function useCreateCookbookMutation() {
  return Urql.useMutation<Operations.CreateCookbookMutation, Operations.CreateCookbookMutationVariables>(Operations.CreateCookbookDocument);
};