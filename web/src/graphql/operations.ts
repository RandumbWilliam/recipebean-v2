import * as Types from './types';

import gql from 'graphql-tag';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
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