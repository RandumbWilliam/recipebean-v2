import React, { createContext, useState } from "react";

const initialRecipeData = {
  name: "",
  servings: "",
  prepTime: 0,
  cookTime: 0,
  imageUrl: "",
  imageId: "",
  ingredientItems: [],
  instructionItems: [],
};

export interface RecipeDataType {
  name: string;
  servings: string;
  prepTime: number;
  cookTime: number;
  imageUrl: string;
  imageId: string;
  ingredientItems: any[];
  instructionItems: any[];
}

interface RecipeContextType {
  recipeData: RecipeDataType;
  setRecipeData: React.Dispatch<
    React.SetStateAction<RecipeContextType["recipeData"]>
  >;
}

export const RecipeContext = createContext<RecipeContextType>({
  recipeData: initialRecipeData,
  setRecipeData: () => {},
});

export default function RecipeContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [recipeData, setRecipeData] =
    useState<RecipeDataType>(initialRecipeData);

  return (
    <RecipeContext.Provider value={{ recipeData, setRecipeData }}>
      {children}
    </RecipeContext.Provider>
  );
}
