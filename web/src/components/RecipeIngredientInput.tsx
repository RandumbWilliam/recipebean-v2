import { ingredientParser } from "@/helpers/ingredient";
import { useState } from "react";
import { TextField } from "react-aria-components";
import { type IngredientItem } from "./IngredientInput";
import { IconPlus, IconX } from "./icons";
import { Input } from "./ui/input";

interface RecipeIngredientInputProps {
  handleIngredientInput: (ingredientItem: IngredientItem) => void;
}

const initialIngredientItem = {
  header: "",
  ingredient: "",
};

const RecipeIngredientInput: React.FC<RecipeIngredientInputProps> = ({
  handleIngredientInput,
}) => {
  const [ingredientItem, setIngredientItem] = useState<{
    header: string;
    ingredient: string;
  }>(initialIngredientItem);
  const [showIngredientHeader, setShowIngredientHeader] = useState(false);

  const handleIngredient = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setIngredientItem({ ...ingredientItem, [e.target.name]: e.target.value });
  };

  const submitIngredientHeader = () => {
    if (ingredientItem?.header) {
      setShowIngredientHeader(false);
    } else {
      submitIngredientItem();
    }
  };

  const submitIngredientItem = () => {
    handleIngredientInput({
      header: ingredientItem.header,
      ingredient: ingredientParser(ingredientItem.ingredient),
    });

    setIngredientItem(initialIngredientItem);
    setShowIngredientHeader(false);
  };

  return (
    <div className="flex flex-col gap-1.5">
      {showIngredientHeader && (
        <TextField className="relative w-full mb-3" aria-label="ingredient">
          <Input
            className="pr-8"
            name="header"
            value={ingredientItem.header}
            onChange={handleIngredient}
            onBlur={submitIngredientHeader}
            autoFocus
            onKeyDown={(e) => {
              if (e.key === "Enter") submitIngredientHeader();
            }}
          />
          <button
            type="button"
            onMouseDown={() => setShowIngredientHeader(false)}
            className="absolute right-1 top-2.5"
          >
            <IconX />
          </button>
        </TextField>
      )}
      <div className="flex gap-1.5">
        <Input
          type="text"
          name="ingredient"
          placeholder="Add a ingredient"
          value={ingredientItem.ingredient}
          onChange={handleIngredient}
          onKeyDown={(e) => {
            if (e.key === "Enter") submitIngredientItem();
          }}
        />
        <button
          type="button"
          className="flex items-center justify-center h-[42px] w-[42px] min-w-[42px] bg-primary rounded-md"
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
        <IconPlus className="h-4 w-4 fill-primary" />{" "}
        <p className="text-primary">Header</p>
      </button>
    </div>
  );
};

export default RecipeIngredientInput;
