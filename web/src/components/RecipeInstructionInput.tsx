import { RecipeContext } from "@/context/recipe.context";
import { useContext, useState } from "react";
import { TextField } from "react-aria-components";
import { IconPlus } from "./icons";
import { Input } from "./ui/Input";
import { Label } from "./ui/Label";

const initialInstructionItem = {
  header: "",
  instruction: "",
};

const RecipeInstructionInput = () => {
  const { recipeData, setRecipeData } = useContext(RecipeContext);
  const [instructionItem, setInstructionItem] = useState(
    initialInstructionItem
  );
  const [showInstructionHeader, setShowInstructionHeader] = useState(false);

  const handleIngredient = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setInstructionItem({ ...instructionItem, [e.target.name]: e.target.value });
  };

  const submitInstructionItem = async () => {
    setRecipeData((prevRecipeData) => ({
      ...prevRecipeData,
      instructionItems: [...prevRecipeData.instructionItems, instructionItem],
    }));
    setInstructionItem(initialInstructionItem);
    setShowInstructionHeader(false);
  };

  return (
    <TextField>
      <Label>Instructions</Label>
      <div className="flex flex-col gap-1.5">
        {recipeData.instructionItems.length > 0 && (
          <ul className="flex flex-col gap-1.5 list-disc list-outside">
            {recipeData.instructionItems.map((item, index) => {
              if (item.header) {
                return (
                  <b key={index} className="ml-4">
                    {item.header}
                  </b>
                );
              } else {
                return (
                  <li key={index} className="ml-8">
                    {item.instruction}
                  </li>
                );
              }
            })}
          </ul>
        )}
        {showInstructionHeader && (
          <div className="flex gap-1.5">
            <Input
              type="text"
              name="header"
              placeholder="Add a header"
              value={instructionItem.header}
              onChange={handleIngredient}
            />
            <button
              type="button"
              className="flex items-center justify-center h-[42px] w-[42px] min-w-[42px] bg-brink-pink-500 rounded-md"
              onClick={submitInstructionItem}
            >
              <IconPlus className="fill-white" />
            </button>
          </div>
        )}
        <div className="flex gap-1.5">
          <Input
            type="text"
            name="instruction"
            placeholder="Add a step"
            value={instructionItem.instruction}
            onChange={handleIngredient}
          />
          <button
            type="button"
            className="flex items-center justify-center h-[42px] w-[42px] min-w-[42px] bg-brink-pink-500 rounded-md"
            onClick={submitInstructionItem}
          >
            <IconPlus className="fill-white" />
          </button>
        </div>
        <button
          type="button"
          className="flex gap-1.5 items-center"
          onClick={() => setShowInstructionHeader(true)}
        >
          <IconPlus className="h-4 w-4 fill-brink-pink-500" />{" "}
          <p className="text-brink-pink-500">Header</p>
        </button>
      </div>
    </TextField>
  );
};

export default RecipeInstructionInput;
