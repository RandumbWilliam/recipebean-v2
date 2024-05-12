import { ingredientLabel, ingredientParser } from "@/helpers/ingredient.js";
import { cn } from "@/utils/cn";
import Image from "next/image";
import { useRef, useState } from "react";
import type { FileDropItem } from "react-aria";

import {
  IngredientItemValidator,
  InstructionItemValidator,
  RecipeValidator,
} from "@/graphql/types";
import { DropZone, FileTrigger, TextField } from "react-aria-components";
import RecipeIngredientInput, {
  type IngredientItem,
} from "./RecipeIngredientInput";
import RecipeInstructionInput, {
  type InstructionItem,
} from "./RecipeInstructionInput";
import { IconTrash } from "./icons";
import { Input } from "./ui/Input";
import { Label } from "./ui/Label";

interface RecipeFormProps {
  className?: string;
}

const initialRecipeData = {
  name: "",
  servings: 0,
  prepTime: 0,
  cookTime: 0,
  imageUrl: "",
  imageId: "",
  ingredientItems: [],
  instructionItems: [],
};

const RecipeForm: React.FC<RecipeFormProps> = ({ className }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [recipeData, setRecipeData] =
    useState<RecipeValidator>(initialRecipeData);
  const [ingredientItemRank, setIngredientItemRank] = useState(0);
  const [instructionItemRank, setInstructionItemRank] = useState(0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setRecipeData({ ...recipeData, [e.target.name]: e.target.value });
  };

  const MAX_FILE_SIZE = 6 * 1024 * 1024; // 6 MB
  const handleCoverImage = (file: File) => {
    setImageFile(file);
    setRecipeData({ ...recipeData, imageUrl: URL.createObjectURL(file) });
    // const reader = (readFile: File) =>
    //   new Promise<string>((resolve, reject) => {
    //     if (readFile.size > MAX_FILE_SIZE) {
    //       reject(new Error("File size exceeds the maximum limit."));
    //       return;
    //     }
    //     const fileReader = new FileReader();
    //     fileReader.onload = () => resolve(fileReader.result as string);
    //     fileReader.readAsDataURL(readFile);
    //   });

    // reader(file)
    //   .then((result: string) =>
    //     setRecipeData({ ...recipeData, imageBlob: result })
    //   )
    //   .catch((error: Error) => {
    //     console.log(error);
    //   });
  };

  const deleteCoverImage = () => {
    setImageFile(null);
    URL.revokeObjectURL(recipeData.imageUrl);
    setRecipeData({ ...recipeData, imageUrl: "" });
  };

  const addIngredient = (ingredientItem: IngredientItem) => {
    const ingredient = {
      rank: ingredientItemRank,
    } as IngredientItemValidator;

    if (ingredientItem.header) {
      ingredient.header = ingredientItem.header;
    }

    if (ingredientItem.ingredient) {
      ingredient.ingredient = ingredientParser(ingredientItem.ingredient);
    }

    setIngredientItemRank(ingredientItemRank + 1);
    setRecipeData((prevState) => ({
      ...prevState,
      ingredientItems: [...prevState.ingredientItems, ingredient],
    }));
  };

  const addInstruction = (instructionItem: InstructionItem) => {
    const instruction = {
      rank: instructionItemRank,
    } as InstructionItemValidator;

    if (instructionItem.header) {
      instruction.header = instructionItem.header;
    }

    if (instructionItem.instruction) {
      instruction.instruction = { text: instructionItem.instruction };
    }

    setInstructionItemRank(instructionItemRank + 1);
    setRecipeData((prevState) => ({
      ...prevState,
      instructionItems: [...prevState.instructionItems, instruction],
    }));
  };

  return (
    <form className={cn("flex flex-col", className)}>
      <TextField>
        <Label>Recipe Name</Label>
        <Input
          type="text"
          name="name"
          placeholder='e.g. "White Bean Soup"'
          value={recipeData.name}
          onChange={handleChange}
        />
      </TextField>
      <div>
        <Label>Cover Image</Label>
        <div
          className="cursor-pointer"
          onClick={() => fileInputRef.current?.click()}
        >
          {recipeData.imageUrl ? (
            <div className="relative w-full h-[352px] rounded-xl overflow-hidden">
              <Image
                src={recipeData.imageUrl}
                alt="Preview cover image"
                fill
                style={{ objectFit: "cover" }}
              />
              <div className="absolute bottom-3 right-3 flex gap-3">
                <button
                  className="flex items-center justify-center bg-white w-auto h-10 rounded-md px-2"
                  onClick={() => fileInputRef.current?.click()}
                >
                  Change
                </button>
                <button
                  className="flex items-center justify-center bg-white w-10 h-10 rounded-md"
                  onClick={deleteCoverImage}
                >
                  <IconTrash />
                </button>
              </div>
            </div>
          ) : (
            <DropZone
              className="flex h-[220px] w-full flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed text-sm data-[drop-target]:border-solid data-[drop-target]:border-brink-pink-500 data-[drop-target]:bg-brink-pink-100/10"
              onDrop={async (e) => {
                let item = e.items.find(
                  (item) =>
                    item.kind === "file" &&
                    (item.type === "image/jpeg" || item.type === "image/png")
                ) as FileDropItem;
                if (item) {
                  const imageFile = await item.getFile();
                  handleCoverImage(imageFile);
                }
              }}
            >
              <FileTrigger
                ref={fileInputRef}
                onSelect={(e) => {
                  let files = e ? Array.from(e) : [];
                  const imageFile = files[0];
                  if (
                    imageFile.type === "image/jpeg" ||
                    imageFile.type === "image/png"
                  ) {
                    handleCoverImage(imageFile);
                  }
                }}
              />
              <Image
                src="/dropzone-photo.svg"
                alt="Dropzone Image Icon"
                width={60}
                height={60}
              />
              <p>Drop and drop an image or click to browse.</p>
              <p className="text-gray-400">Max 6MB, Recommneded: 564 x 352</p>
            </DropZone>
          )}
        </div>
      </div>
      <TextField>
        <Label>Ingredients</Label>
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
        <RecipeIngredientInput handleIngredientInput={addIngredient} />
      </TextField>
      <TextField>
        <Label>Instructions</Label>
        {recipeData.instructionItems.length > 0 && (
          <ul className="flex flex-col gap-1.5 list-disc list-outside">
            {recipeData.instructionItems.map((item, index) => {
              if (item.header) {
                return (
                  <b key={index} className="ml-4">
                    {item.header}
                  </b>
                );
              }
              if (item.instruction) {
                return (
                  <li key={index} className="ml-8">
                    {item.instruction.text}
                  </li>
                );
              }
            })}
          </ul>
        )}
        <RecipeInstructionInput handleInstructionInput={addInstruction} />
      </TextField>
      <TextField>
        <Label>Servings</Label>
        <Input
          type="text"
          name="name"
          placeholder="#"
          value={recipeData.servings}
          onChange={handleChange}
        />
      </TextField>
      <TextField>
        <Label>Prep time</Label>
        <Input
          type="text"
          name="prepTime"
          placeholder="Minutes"
          value={recipeData.prepTime}
          onChange={handleChange}
        />
      </TextField>
      <TextField>
        <Label>Cook Time</Label>
        <Input
          type="text"
          name="cookTime"
          placeholder="Minutes"
          value={recipeData.cookTime}
          onChange={handleChange}
        />
      </TextField>
    </form>
  );
};

export default RecipeForm;
