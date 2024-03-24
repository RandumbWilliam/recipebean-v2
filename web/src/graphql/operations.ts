import * as Types from './types';

import gql from 'graphql-tag';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type CookbookResponseFragment = { __typename?: 'Cookbook', id: string, name: string, coverId: Types.CookbookCover };

export type RecipeResponseFragment = { __typename?: 'Recipe', id: string, name: string, servings: number, prepTime: number, cookTime: number, imageUrl: string, imageId: string };

export type UserResponseFragment = { __typename?: 'User', id: string, email: string, fullName: string, avatarId: Types.UserAvatar };

export type MyUserQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type MyUserQuery = { __typename?: 'Query', myUser: { __typename?: 'User', id: string, email: string, fullName: string, avatarId: Types.UserAvatar } };

export type SignUpMutationVariables = Types.Exact<{
  userData: Types.UserValidator;
}>;


export type SignUpMutation = { __typename?: 'Mutation', signup: { __typename?: 'User', id: string, email: string, fullName: string, avatarId: Types.UserAvatar } };

export type SignInMutationVariables = Types.Exact<{
  password: Types.Scalars['String']['input'];
  email: Types.Scalars['String']['input'];
}>;


export type SignInMutation = { __typename?: 'Mutation', signin: { __typename?: 'User', id: string, email: string, fullName: string, avatarId: Types.UserAvatar } };

export type GetUserCookbooksQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetUserCookbooksQuery = { __typename?: 'Query', getUserCookbooks: Array<{ __typename?: 'Cookbook', id: string, name: string, coverId: Types.CookbookCover }> };

export type GetCookbookQueryVariables = Types.Exact<{
  cookbookId: Types.Scalars['String']['input'];
}>;


export type GetCookbookQuery = { __typename?: 'Query', getCookbook: { __typename?: 'Cookbook', id: string, name: string, coverId: Types.CookbookCover, recipes: Array<{ __typename?: 'Recipe', id: string, name: string, servings: number, prepTime: number, cookTime: number, imageUrl: string, imageId: string }> } };

export type CreateCookbookMutationVariables = Types.Exact<{
  cookbookData: Types.CookbookValidator;
}>;


export type CreateCookbookMutation = { __typename?: 'Mutation', createCookbook: { __typename?: 'Cookbook', id: string, name: string, coverId: Types.CookbookCover } };

export const CookbookResponseFragmentDoc = gql`
    fragment CookbookResponse on Cookbook {
  id
  name
  coverId
}
    `;
export const RecipeResponseFragmentDoc = gql`
    fragment RecipeResponse on Recipe {
  id
  name
  servings
  prepTime
  cookTime
  imageUrl
  imageId
}
    `;
export const UserResponseFragmentDoc = gql`
    fragment UserResponse on User {
  id
  email
  fullName
  avatarId
}
    `;
export const MyUserDocument = gql`
    query MyUser {
  myUser {
    ...UserResponse
  }
}
    ${UserResponseFragmentDoc}`;
export const SignUpDocument = gql`
    mutation SignUp($userData: UserValidator!) {
  signup(userData: $userData) {
    ...UserResponse
  }
}
    ${UserResponseFragmentDoc}`;
export const SignInDocument = gql`
    mutation SignIn($password: String!, $email: String!) {
  signin(password: $password, email: $email) {
    ...UserResponse
  }
}
    ${UserResponseFragmentDoc}`;
export const GetUserCookbooksDocument = gql`
    query GetUserCookbooks {
  getUserCookbooks {
    ...CookbookResponse
  }
}
    ${CookbookResponseFragmentDoc}`;
export const GetCookbookDocument = gql`
    query GetCookbook($cookbookId: String!) {
  getCookbook(cookbookId: $cookbookId) {
    ...CookbookResponse
    recipes {
      ...RecipeResponse
    }
  }
}
    ${CookbookResponseFragmentDoc}
${RecipeResponseFragmentDoc}`;
export const CreateCookbookDocument = gql`
    mutation CreateCookbook($cookbookData: CookbookValidator!) {
  createCookbook(cookbookData: $cookbookData) {
    id
    name
    coverId
  }
}
    `;