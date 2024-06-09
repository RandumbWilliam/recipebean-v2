import { InstructionValidator } from "@/graphql/types";
import { useState } from "react";
import { TextField } from "react-aria-components";
import { IconX } from "./icons";
import { Input } from "./ui/Input";

export interface InstructionItem {
  step?: number | null;
  header?: string | null;
  instruction?: InstructionValidator | null;
}

interface InstructionInputProps {
  reorder: boolean;
  item: InstructionItem;
  onValueChange: (item: InstructionItem) => void;
  onRemove: () => void;
}

const InstructionInput: React.FC<InstructionInputProps> = ({
  reorder,
  item,
  onValueChange,
  onRemove,
}) => {
  const [isEditing, setEditing] = useState(false);
  const [value, setValue] = useState(
    item.header ? item.header : item.instruction?.text
  );

  const handleValueChange = () => {
    if (!value) {
      onRemove();
    } else {
      if (item.header) {
        onValueChange({
          ...item,
          header: value,
        });
      } else {
        onValueChange({
          ...item,
          instruction: {
            text: value,
          },
        });
      }
    }
  };

  const enableEditing = () => {
    if (reorder) {
      setEditing(false);
    } else {
      setEditing(!isEditing);
    }
  };

  if (isEditing) {
    return (
      <TextField className="relative w-full" aria-label="edit instruction">
        <Input
          className="pr-8"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onBlur={handleValueChange}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleValueChange();
          }}
          autoFocus
        />
        <button
          type="button"
          onMouseDown={onRemove}
          className="absolute right-1 top-2.5"
        >
          <IconX />
        </button>
      </TextField>
    );
  }

  if (item.header) {
    return (
      <h5
        className="text-primary text-lg font-semibold py-2 px-3"
        onClick={enableEditing}
      >
        {value}
      </h5>
    );
  }

  if (item.instruction) {
    return (
      <div className="py-2 px-6">
        <b className="text-primary">Step {item.step}</b>
        <p onClick={enableEditing}>{value}</p>
      </div>
    );
  }
};

export default InstructionInput;
