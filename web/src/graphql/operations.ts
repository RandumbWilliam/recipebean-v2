import * as Types from './types';

import gql from 'graphql-tag';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type RecipeResponseFragment = { __typename?: 'Recipe', id: string, name: string, servings?: number | null, prepTime?: number | null, cookTime?: number | null, imageUrl?: string | null };

export type UserResponseFragment = { __typename?: 'User', id: string, email: string, fullName: string, avatarId: Types.UserAvatar };

export type MyUserQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type MyUserQuery = { __typename?: 'Query', myUser?: { __typename?: 'User', id: string, email: string, fullName: string, avatarId: Types.UserAvatar } | null };

export type SignUpMutationVariables = Types.Exact<{
  userData: Types.UserValidator;
}>;


export type SignUpMutation = { __typename?: 'Mutation', signup: { __typename?: 'User', id: string, email: string, fullName: string, avatarId: Types.UserAvatar } };

export type SignInMutationVariables = Types.Exact<{
  password: Types.Scalars['String']['input'];
  email: Types.Scalars['String']['input'];
}>;


export type SignInMutation = { __typename?: 'Mutation', signin: { __typename?: 'User', id: string, email: string, fullName: string, avatarId: Types.UserAvatar } };

export type LogoutMutationVariables = Types.Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type GetUserRecipesQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetUserRecipesQuery = { __typename?: 'Query', getUserRecipes: Array<{ __typename?: 'Recipe', id: string, name: string, servings?: number | null, prepTime?: number | null, cookTime?: number | null, imageUrl?: string | null }> };

export type GetRecipeQueryVariables = Types.Exact<{
  recipeId: Types.Scalars['String']['input'];
}>;


export type GetRecipeQuery = { __typename?: 'Query', getRecipe: { __typename?: 'Recipe', id: string, name: string, servings?: number | null, prepTime?: number | null, cookTime?: number | null, imageUrl?: string | null, ingredientItems: Array<{ __typename?: 'IngredientItem', id: string, rank: number, header?: string | null, ingredient: { __typename?: 'Ingredient', id: string, name: Array<string>, hasAddedMeasurements: boolean, hasAlternativeIngredients: boolean, additional?: string | null, measurement?: Array<{ __typename?: 'Measurement', isRange: boolean, quantity?: Array<number> | null, unit?: string | null, unitPlural?: string | null }> | null, convertedMeasurement?: { __typename?: 'Measurement', isRange: boolean, quantity?: Array<number> | null, unit?: string | null, unitPlural?: string | null } | null } }>, instructionItems: Array<{ __typename?: 'InstructionItem', id: string, rank: number, header?: string | null, instruction: { __typename?: 'Instruction', id: string, text: string } }> } };

export type CreateRecipeMutationVariables = Types.Exact<{
  recipeData: Types.RecipeValidator;
}>;


export type CreateRecipeMutation = { __typename?: 'Mutation', createRecipe: { __typename?: 'Recipe', id: string } };

export const RecipeResponseFragmentDoc = gql`
    fragment RecipeResponse on Recipe {
  id
  name
  servings
  prepTime
  cookTime
  imageUrl
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
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export const GetUserRecipesDocument = gql`
    query GetUserRecipes {
  getUserRecipes {
    ...RecipeResponse
  }
}
    ${RecipeResponseFragmentDoc}`;
export const GetRecipeDocument = gql`
    query GetRecipe($recipeId: String!) {
  getRecipe(recipeId: $recipeId) {
    id
    name
    servings
    prepTime
    cookTime
    imageUrl
    ingredientItems {
      id
      rank
      header
      ingredient {
        id
        name
        measurement {
          isRange
          quantity
          unit
          unitPlural
        }
        convertedMeasurement {
          isRange
          quantity
          unit
          unitPlural
        }
        hasAddedMeasurements
        hasAlternativeIngredients
        additional
      }
    }
    instructionItems {
      id
      rank
      header
      instruction {
        id
        text
      }
    }
  }
}
    `;
export const CreateRecipeDocument = gql`
    mutation CreateRecipe($recipeData: RecipeValidator!) {
  createRecipe(recipeData: $recipeData) {
    id
  }
}
    `;