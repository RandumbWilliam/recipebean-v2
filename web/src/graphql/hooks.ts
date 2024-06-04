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

export function useGetUserRecipesQuery(options?: Omit<Urql.UseQueryArgs<Operations.GetUserRecipesQueryVariables>, 'query'>) {
  return Urql.useQuery<Operations.GetUserRecipesQuery, Operations.GetUserRecipesQueryVariables>({ query: Operations.GetUserRecipesDocument, ...options });
};

export function useGetRecipeQuery(options: Omit<Urql.UseQueryArgs<Operations.GetRecipeQueryVariables>, 'query'>) {
  return Urql.useQuery<Operations.GetRecipeQuery, Operations.GetRecipeQueryVariables>({ query: Operations.GetRecipeDocument, ...options });
};

export function useCreateRecipeMutation() {
  return Urql.useMutation<Operations.CreateRecipeMutation, Operations.CreateRecipeMutationVariables>(Operations.CreateRecipeDocument);
};