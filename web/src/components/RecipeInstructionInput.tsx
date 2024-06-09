import { useState } from "react";
import { type InstructionItem } from "./InstructionInput";
import { IconPlus } from "./icons";
import { Input } from "./ui/Input";

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
  const [instructionItem, setInstructionItem] = useState<{
    header: string;
    instruction: string;
  }>(initialInstructionItem);
  const [showInstructionHeader, setShowInstructionHeader] = useState(false);

  const handleIngredient = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setInstructionItem({ ...instructionItem, [e.target.name]: e.target.value });
  };

  const submitInstructionHeader = () => {
    if (instructionItem.header === "") {
      setShowInstructionHeader(false);
    } else {
      submitInstructionItem();
    }
  };

  const submitInstructionItem = async () => {
    handleInstructionInput({
      header: instructionItem.header,
      instruction: { text: instructionItem.instruction },
    });

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
            onBlur={submitInstructionHeader}
            autoFocus
            onKeyDown={(e) => {
              if (e.key === "Enter") submitInstructionHeader();
            }}
          />
          <button
            type="button"
            className="flex items-center justify-center h-[42px] w-[42px] min-w-[42px] bg-primary rounded-md"
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
          onKeyDown={(e) => {
            if (e.key === "Enter") submitInstructionItem();
          }}
        />
        <button
          type="button"
          className="flex items-center justify-center h-[42px] w-[42px] min-w-[42px] bg-primary rounded-md"
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
        <IconPlus className="h-4 w-4 fill-primary" />{" "}
        <p className="text-primary">Header</p>
      </button>
    </div>
  );
};

export default RecipeInstructionInput;
