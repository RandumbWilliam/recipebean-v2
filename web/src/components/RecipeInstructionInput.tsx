import { useState } from "react";
import { IconPlus } from "./icons";
import { Input } from "./ui/Input";

export interface InstructionItem {
  header: string;
  instruction: string;
}

interface RecipeInstructionInputProps {
  handleInstructionInput: (instructionItem: InstructionItem) => void;
}

const initialInstructionItem = {
  header: "",
  instruction: "",
};

const RecipeInstructionInput: React.FC<RecipeInstructionInputProps> = ({
  handleInstructionInput,
}) => {
  const [instructionItem, setInstructionItem] = useState<InstructionItem>(
    initialInstructionItem
  );
  const [showInstructionHeader, setShowInstructionHeader] = useState(false);

  const handleIngredient = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setInstructionItem({ ...instructionItem, [e.target.name]: e.target.value });
  };

  const submitInstructionItem = async () => {
    handleInstructionInput(instructionItem);

    setInstructionItem(initialInstructionItem);
    setShowInstructionHeader(false);
  };

  return (
    <div className="flex flex-col gap-1.5">
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
  );
};

export default RecipeInstructionInput;
