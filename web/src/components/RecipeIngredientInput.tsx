import { RecipeContext } from "@/context/recipe.context";
import { ingredientLabel, ingredientParser } from "@/helpers/ingredient.js";
import { useContext, useState } from "react";
import { TextField } from "react-aria-components";
import { IconPlus, IconTrash } from "./icons";
import { Input } from "./ui/Input";
import { Label } from "./ui/Label";

const initialIngredientItem: { header: string; ingredient: any } = {
  header: "",
  ingredient: "",
};

const RecipeIngredientInput = () => {
  const { recipeData, setRecipeData } = useContext(RecipeContext);
  const [ingredientItem, setIngredientItem] = useState(initialIngredientItem);
  const [showIngredientHeader, setShowIngredientHeader] = useState(false);

  const handleIngredient = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setIngredientItem({ ...ingredientItem, [e.target.name]: e.target.value });
  };

  const submitIngredientItem = async () => {
    const parsedIngredientItem = {
      header: ingredientItem.header ? ingredientItem.header : null,
      ingredient: ingredientItem.ingredient ? ingredientItem.ingredient : null,
    };

    if (ingredientItem.ingredient) {
      parsedIngredientItem.ingredient = ingredientParser(
        ingredientItem.ingredient
      );
    }

    setRecipeData((prevRecipeData) => ({
      ...prevRecipeData,
      ingredientItems: [
        ...prevRecipeData.ingredientItems,
        parsedIngredientItem,
      ],
    }));
    setIngredientItem(initialIngredientItem);
    setShowIngredientHeader(false);
  };

  return (
    <TextField>
      <Label>Ingredients</Label>
      <div className="flex flex-col gap-1.5">
        {recipeData.ingredientItems.length > 0 && (
          <ul className="flex flex-col gap-1.5 list-disc list-outside">
            {recipeData.ingredientItems.map((item, index) => {
              if (item.header) {
                return (
                  <b key={index} className="ml-4">
                    {item.header}
                  </b>
                );
              } else {
                return (
                  <li key={index} className="ml-8">
                    {ingredientLabel(item.ingredient)}
                  </li>
                );
              }
            })}
          </ul>
        )}
        {showIngredientHeader && (
          <div className="flex gap-1.5">
            <Input
              type="text"
              name="header"
              placeholder="Add a header"
              value={ingredientItem.header}
              onChange={handleIngredient}
            />
            <button
              type="button"
              className="flex items-center justify-center h-[42px] w-[42px] min-w-[42px] bg-brink-pink-500 rounded-md"
              onClick={submitIngredientItem}
            >
              <IconPlus className="fill-white" />
            </button>
          </div>
        )}
        <div className="flex gap-1.5">
          <Input
            type="text"
            name="ingredient"
            placeholder="Add a ingredient"
            value={ingredientItem.ingredient}
            onChange={handleIngredient}
          />
          <button
            type="button"
            className="flex items-center justify-center h-[42px] w-[42px] min-w-[42px] bg-brink-pink-500 rounded-md"
            onClick={submitIngredientItem}
          >
            <IconPlus className="fill-white" />
          </button>
        </div>
        <button
          type="button"
          className="flex gap-1.5 items-center"
          onClick={() => setShowIngredientHeader(true)}
        >
          <IconPlus className="h-4 w-4 fill-brink-pink-500" />{" "}
          <p className="text-brink-pink-500">Header</p>
        </button>
      </div>
    </TextField>
  );
};

export default RecipeIngredientInput;
