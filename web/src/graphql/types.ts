export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTimeISO: { input: any; output: any; }
};

export type Base = {
  createdAt: Scalars['DateTimeISO']['output'];
  id: Scalars['ID']['output'];
  updatedAt: Scalars['DateTimeISO']['output'];
};

export type IngredientItemValidator = {
  header?: InputMaybe<Scalars['String']['input']>;
  ingredient?: InputMaybe<IngredientValidator>;
  rank: Scalars['Float']['input'];
};

export type IngredientValidator = {
  additional?: InputMaybe<Scalars['String']['input']>;
  convertedMeasurement?: InputMaybe<MeasurementValidator>;
  hasAddedMeasurements: Scalars['Boolean']['input'];
  hasAlternativeIngredients: Scalars['Boolean']['input'];
  measurement?: InputMaybe<Array<MeasurementValidator>>;
  name: Array<Scalars['String']['input']>;
};

export type InstructionItemValidator = {
  header?: InputMaybe<Scalars['String']['input']>;
  instruction?: InputMaybe<InstructionValidator>;
  rank: Scalars['Float']['input'];
};

export type InstructionValidator = {
  text: Scalars['String']['input'];
};

export type MeasurementValidator = {
  isRange: Scalars['Boolean']['input'];
  quantity?: InputMaybe<Array<Scalars['Float']['input']>>;
  unit?: InputMaybe<Scalars['String']['input']>;
  unitPlural?: InputMaybe<Scalars['String']['input']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createRecipe: Recipe;
  delete: Scalars['Boolean']['output'];
  deleteRecipe: Scalars['Boolean']['output'];
  forgotPassword: Scalars['Boolean']['output'];
  logout: Scalars['Boolean']['output'];
  resetPassword: Scalars['Boolean']['output'];
  signin: User;
  signup: User;
  updatePassword: User;
  updateUser: User;
};


export type MutationCreateRecipeArgs = {
  recipeData: RecipeValidator;
};


export type MutationDeleteArgs = {
  password: Scalars['String']['input'];
};


export type MutationDeleteRecipeArgs = {
  recipeId: Scalars['String']['input'];
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String']['input'];
};


export type MutationResetPasswordArgs = {
  confirmPassword: Scalars['String']['input'];
  newPassword: Scalars['String']['input'];
  token: Scalars['String']['input'];
};


export type MutationSigninArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationSignupArgs = {
  userData: UserValidator;
};


export type MutationUpdatePasswordArgs = {
  confirmPassword: Scalars['String']['input'];
  newPassword: Scalars['String']['input'];
  oldPassword: Scalars['String']['input'];
};


export type MutationUpdateUserArgs = {
  userData: UserValidator;
};

export type Query = {
  __typename?: 'Query';
  getUserRecipes: Array<Recipe>;
  myUser: User;
};

export type Recipe = Base & {
  __typename?: 'Recipe';
  cookTime?: Maybe<Scalars['Float']['output']>;
  createdAt: Scalars['DateTimeISO']['output'];
  id: Scalars['ID']['output'];
  imageUrl?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  prepTime?: Maybe<Scalars['Float']['output']>;
  servings?: Maybe<Scalars['Float']['output']>;
  updatedAt: Scalars['DateTimeISO']['output'];
};

export type RecipeValidator = {
  cookTime?: InputMaybe<Scalars['Float']['input']>;
  imageUrl?: InputMaybe<Scalars['String']['input']>;
  ingredientItems?: InputMaybe<Array<IngredientItemValidator>>;
  instructionItems?: InputMaybe<Array<InstructionItemValidator>>;
  name: Scalars['String']['input'];
  prepTime?: InputMaybe<Scalars['Float']['input']>;
  servings?: InputMaybe<Scalars['Float']['input']>;
};

export type User = Base & {
  __typename?: 'User';
  avatarId: UserAvatar;
  createdAt: Scalars['DateTimeISO']['output'];
  email: Scalars['String']['output'];
  fullName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  password: Scalars['String']['output'];
  updatedAt: Scalars['DateTimeISO']['output'];
};

export enum UserAvatar {
  Bowl = 'Bowl',
  Broccoli = 'Broccoli',
  Burger = 'Burger',
  Carrot = 'Carrot',
  Cauliflower = 'Cauliflower',
  Corn = 'Corn',
  Guacamole = 'Guacamole',
  Hat = 'Hat',
  Hotdog = 'Hotdog',
  Milk = 'Milk',
  Onion = 'Onion',
  Orange = 'Orange',
  Patty = 'Patty',
  Pot = 'Pot',
  Salad = 'Salad'
}

export type UserValidator = {
  avatarId: UserAvatar;
  email: Scalars['String']['input'];
  fullName: Scalars['String']['input'];
  password: Scalars['String']['input'];
};
