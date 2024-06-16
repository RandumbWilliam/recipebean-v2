import { IngredientValidator } from "@/graphql/types";
import { ingredientLabel, ingredientParser } from "@/helpers/ingredient";
import { useState } from "react";
import { TextField } from "react-aria-components";
import { IconX } from "./icons";
import { Input } from "./ui/input";

export interface IngredientItem {
  header?: string | null;
  ingredient?: IngredientValidator | null;
}

interface IngredientInputProps {
  reorder: boolean;
  item: IngredientItem;
  onValueChange: (item: IngredientItem) => void;
  onRemove: () => void;
}

const IngredientInput: React.FC<IngredientInputProps> = ({
  reorder,
  item,
  onValueChange,
  onRemove,
}) => {
  const [isEditing, setEditing] = useState(false);
  const [value, setValue] = useState(
    item.header ? item.header : ingredientLabel(item.ingredient)
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
          ingredient: ingredientParser(value),
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
      <TextField className="relative w-full" aria-label="edit ingredient">
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
          className="absolute right-2 top-2.5"
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

  if (item.ingredient) {
    return (
      <p className="py-2 px-6" onClick={enableEditing}>
        {value}
      </p>
    );
  }
};

export default IngredientInput;
