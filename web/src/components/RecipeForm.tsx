import { ingredientLabel, ingredientParser } from "@/helpers/ingredient.js";
import { cn } from "@/utils/cn";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { FileDropItem } from "react-aria";
import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
  DroppableProps,
} from "react-beautiful-dnd";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";

import { DropZone, FileTrigger, TextField } from "react-aria-components";
import RecipeIngredientInput, {
  type IngredientItem,
} from "./RecipeIngredientInput";
import RecipeInstructionInput, {
  type InstructionItem,
} from "./RecipeInstructionInput";
import { IconMenu, IconTrash, IconX } from "./icons";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";
import { Label } from "./ui/Label";

const StrictModeDroppable = ({ children, ...props }: DroppableProps) => {
  const [enabled, setEnabled] = useState(false);
  useEffect(() => {
    const animation = requestAnimationFrame(() => setEnabled(true));
    return () => {
      cancelAnimationFrame(animation);
      setEnabled(false);
    };
  }, []);
  if (!enabled) {
    return null;
  }
  return <Droppable {...props}>{children}</Droppable>;
};

function EditableField({
  reorder,
  defaultItem,
  onValueChange,
  onRemove,
}: {
  reorder: boolean;
  defaultItem: { header?: string; item?: string };
  onValueChange: (item: { header?: string; item?: string }) => void;
  onRemove: () => void;
}) {
  const [isEditing, setEditing] = useState(false);
  const [value, setValue] = useState(
    defaultItem.header ? defaultItem.header : defaultItem.item
  );

  const handleValueChange = () => {
    if (value === "") {
      onRemove();
    } else {
      if (defaultItem.header) {
        onValueChange({
          ...defaultItem,
          header: value,
        });
      } else {
        onValueChange({
          ...defaultItem,
          item: value,
        });
      }

      setEditing(false);
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
      <TextField className="relative w-full" aria-label="ingredient">
        <Input
          className="pr-8"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onBlur={handleValueChange}
          autoFocus
          onKeyDown={(e) => {
            if (e.key === "Enter") handleValueChange();
          }}
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

  if (defaultItem.header) {
    return (
      <h5
        className="text-brink-pink-500 text-lg font-semibold py-2 px-3"
        onClick={enableEditing}
      >
        {value}
      </h5>
    );
  } else {
    return (
      <p className="py-2 px-6" onClick={enableEditing}>
        {value}
      </p>
    );
  }
}

interface RecipeFormProps {
  className?: string;
}

const ingredientValidationSchmea = z.object({
  header: z.string().optional(),
  ingredient: z
    .object({
      name: z.array(z.string()),
      measurement: z
        .array(
          z.object({
            isRange: z.boolean(),
            quantity: z.number().optional(),
            unit: z.string().optional(),
            unitPlural: z.string().optional(),
          })
        )
        .optional(),
      convertedMeasurement: z
        .array(
          z.object({
            isRange: z.boolean(),
            quantity: z.number().optional(),
            unit: z.string().optional(),
            unitPlural: z.string().optional(),
          })
        )
        .optional(),
      hasAddedMeasurements: z.boolean(),
      hasAlternativeIngredients: z.boolean(),
      additional: z.string(),
    })
    .optional(),
});

const instructionValidationSchema = z.object({
  header: z.string().optional(),
  instruction: z
    .object({
      text: z.string(),
    })
    .optional(),
});

const validationSchema = z.object({
  name: z.string().trim().min(1, {
    message: "Please give this recipe a title",
  }),
  servings: z
    .any()
    .transform((val) => {
      if (val === undefined || val === "") return undefined;

      return Number(val);
    })
    .pipe(z.number().int().nonnegative().finite().optional().default(0)),
  prepTime: z
    .any()
    .transform((val) => {
      if (val === undefined || val === "") return undefined;

      return Number(val);
    })
    .pipe(z.number().int().nonnegative().finite().optional().default(0)),
  cookTime: z
    .any()
    .transform((val) => {
      if (val === undefined || val === "") return undefined;

      return Number(val);
    })
    .pipe(z.number().int().nonnegative().finite().optional().default(0)),
  imageUrl: z.string().optional(),
  imageId: z.string().optional(),
  ingredientItems: z.array(ingredientValidationSchmea).optional().default([]),
  instructionItems: z.array(instructionValidationSchema).optional().default([]),
});

type RecipeData = z.infer<typeof validationSchema>;
type IngredientData = z.infer<typeof ingredientValidationSchmea>;
type InstructionData = z.infer<typeof instructionValidationSchema>;

const RecipeForm: React.FC<RecipeFormProps> = ({ className }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [reorderIngredient, setReorderIngredient] = useState(false);
  const [reorderInstruction, setReorderInstruction] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RecipeData>({
    resolver: zodResolver(validationSchema),
    defaultValues: {},
    mode: "onBlur",
  });

  const {
    fields: ingredientItemFields,
    move: ingredientItemMove,
    append: ingredientItemAppend,
    remove: ingredientItemRemove,
    update: ingredientItemUpdate,
  } = useFieldArray({
    name: "ingredientItems",
    control,
  });

  const {
    fields: instructionItemFields,
    move: instrcutionItemMove,
    append: instructionItemAppend,
    remove: instructionItemRemove,
    update: instructionItemUpdate,
  } = useFieldArray({
    name: "instructionItems",
    control,
  });

  const allowOnlyNumber = (value: string) => {
    return value.replace(/[^0-9]/g, "");
  };

  const onSubmit = (data: RecipeData) => console.log(data);

  // const MAX_FILE_SIZE = 6 * 1024 * 1024; // 6 MB
  // const handleCoverImage = (file: File) => {
  //   const reader = (readFile: File) =>
  //     new Promise<string>((resolve, reject) => {
  //       if (readFile.size > MAX_FILE_SIZE) {
  //         reject(new Error("File size exceeds the maximum limit."));
  //         return;
  //       }
  //       const fileReader = new FileReader();
  //       fileReader.onload = () => resolve(fileReader.result as string);
  //       fileReader.readAsDataURL(readFile);
  //     });
  //   reader(file)
  //     .then((result: string) =>
  //       setRecipeData({ ...recipeData, imageBlob: result })
  //     )
  //     .catch((error: Error) => {
  //       console.log(error);
  //     });
  // };

  const addIngredient = (ingredientItem: IngredientItem) => {
    const ingredient = {} as IngredientData;

    if (ingredientItem.header) {
      ingredient.header = ingredientItem.header;
    }

    if (ingredientItem.ingredient) {
      ingredient.ingredient = ingredientParser(ingredientItem.ingredient);
    }

    ingredientItemAppend(ingredient);
  };

  const addInstruction = (instructionItem: InstructionItem) => {
    const instruction = {} as InstructionData;

    if (instructionItem.header) {
      instruction.header = instructionItem.header;
    }

    if (instructionItem.instruction) {
      instruction.instruction = { text: instructionItem.instruction };
    }

    instructionItemAppend(instruction);
  };

  const updateIngredientItem = (index: number, item: any) => {
    const ingredient = {} as IngredientData;

    if (item.header) {
      ingredient.header = item.header;
    } else {
      ingredient.ingredient = ingredientParser(item.item);
    }

    ingredientItemUpdate(index, ingredient);
  };

  const updateInstructionItem = (index: number, item: any) => {
    const ingredient = {} as InstructionData;

    if (item.header) {
      ingredient.header = item.header;
    } else {
      ingredient.instruction = { text: item.item };
    }

    instructionItemUpdate(index, ingredient);
  };

  const handleIngredientDrag = ({ source, destination }: DropResult) => {
    if (destination) {
      ingredientItemMove(source.index, destination.index);
    }
  };

  const handleInstructionDrag = ({ source, destination }: DropResult) => {
    if (destination) {
      instrcutionItemMove(source.index, destination.index);
    }
  };

  return (
    <form
      className={cn("flex flex-col items-center gap-6", className)}
      onSubmit={handleSubmit(onSubmit)}
      onKeyDown={(e) => {
        if (e.key === "Enter") e.preventDefault();
      }}
    >
      <div className="flex w-full justify-between mb-6">
        <h1 className="h2-bold">Create Recipe</h1>
        <Button type="submit">Save</Button>
      </div>
      <div className="flex flex-col w-full max-w-xl gap-6">
        <TextField>
          <Label>Recipe Name</Label>
          <Input
            type="text"
            placeholder='e.g. "White Bean Soup"'
            {...register("name")}
          />
          <p>{errors.name?.message}</p>
        </TextField>
        <div>
          <Label>Cover Image</Label>
          <Controller
            control={control}
            name="imageUrl"
            defaultValue=""
            render={({ field: { onChange, value } }) => (
              <div
                className="cursor-pointer"
                onClick={() => fileInputRef.current?.click()}
              >
                {value ? (
                  <div className="relative w-full h-[352px] rounded-xl overflow-hidden">
                    <Image
                      src={value}
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
                        onClick={() => onChange("")}
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
                          (item.type === "image/jpeg" ||
                            item.type === "image/png")
                      ) as FileDropItem;
                      if (item) {
                        const imageFile = await item.getFile();
                        const imageUrl = URL.createObjectURL(imageFile);
                        onChange(imageUrl);
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
                          const imageUrl = URL.createObjectURL(imageFile);
                          onChange(imageUrl);
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
                    <p className="text-gray-400">
                      Max 6MB, Recommneded: 564 x 352
                    </p>
                  </DropZone>
                )}
              </div>
            )}
          />
        </div>

        {/* Ingredients */}
        <div>
          <div className="flex items-center justify-between py-1 px-1">
            <p>Ingredients</p>
            {ingredientItemFields.length > 0 && (
              <button
                type="button"
                className="text-brink-pink-500 font-semibold"
                onClick={() => setReorderIngredient(!reorderIngredient)}
              >
                {reorderIngredient ? "Done" : "Reorder"}
              </button>
            )}
          </div>
          <div className="flex flex-col mb-3">
            <DragDropContext onDragEnd={handleIngredientDrag}>
              <StrictModeDroppable droppableId="ingredient-items">
                {(provided, snapshot) => (
                  <div {...provided.droppableProps} ref={provided.innerRef}>
                    {ingredientItemFields.map((field, index) => {
                      if (reorderIngredient) {
                        return (
                          <Draggable
                            key={`ingredient[${index}]`}
                            draggableId={`item-${index}`}
                            index={index}
                          >
                            {(provided, snapshot) => (
                              <div
                                key={field.id}
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                className="flex justify-between"
                              >
                                {field.header ? (
                                  <h5 className="text-brink-pink-500 text-lg font-semibold py-2 px-3">
                                    {field.header}
                                  </h5>
                                ) : (
                                  <p className="py-2 px-6">
                                    {ingredientLabel(field.ingredient)}
                                  </p>
                                )}
                                <div {...provided.dragHandleProps}>
                                  <IconMenu />
                                </div>
                              </div>
                            )}
                          </Draggable>
                        );
                      } else {
                        return (
                          <EditableField
                            key={field.id}
                            reorder={reorderIngredient}
                            defaultItem={{
                              header: field.header ?? "",
                              item: field.ingredient
                                ? ingredientLabel(field.ingredient)
                                : "",
                            }}
                            onValueChange={(item) =>
                              updateIngredientItem(index, item)
                            }
                            onRemove={() => ingredientItemRemove(index)}
                          />
                        );
                      }
                    })}

                    {provided.placeholder}
                  </div>
                )}
              </StrictModeDroppable>
            </DragDropContext>
          </div>
          <RecipeIngredientInput handleIngredientInput={addIngredient} />
          <p>{errors.ingredientItems?.message}</p>
        </div>

        {/* Instructions */}
        <div>
          <div className="flex items-center justify-between py-1 px-1">
            <p>Instructions</p>
            {instructionItemFields.length > 0 && (
              <button
                type="button"
                className="text-brink-pink-500 font-semibold"
                onClick={() => setReorderInstruction(!reorderInstruction)}
              >
                {reorderInstruction ? "Done" : "Reorder"}
              </button>
            )}
          </div>
          <div className="flex flex-col mb-3">
            <DragDropContext onDragEnd={handleInstructionDrag}>
              <StrictModeDroppable droppableId="instruction-items">
                {(provided, snapshot) => (
                  <div {...provided.droppableProps} ref={provided.innerRef}>
                    {instructionItemFields.map((field, index) => {
                      if (reorderInstruction) {
                        return (
                          <Draggable
                            key={`instruction[${index}]`}
                            draggableId={`item-${index}`}
                            index={index}
                          >
                            {(provided, snapshot) => (
                              <div
                                key={field.id}
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                className="flex justify-between"
                              >
                                {field.header ? (
                                  <h5 className="text-brink-pink-500 text-lg font-semibold py-2 px-3">
                                    {field.header}
                                  </h5>
                                ) : (
                                  <p className="py-2 px-6">
                                    {field.instruction?.text}
                                  </p>
                                )}
                                <div {...provided.dragHandleProps}>
                                  <IconMenu />
                                </div>
                              </div>
                            )}
                          </Draggable>
                        );
                      } else {
                        return (
                          <EditableField
                            key={field.id}
                            reorder={reorderInstruction}
                            defaultItem={{
                              header: field.header ?? "",
                              item: field.instruction?.text ?? "",
                            }}
                            onValueChange={(item) =>
                              updateInstructionItem(index, item)
                            }
                            onRemove={() => instructionItemRemove(index)}
                          />
                        );
                      }
                    })}

                    {provided.placeholder}
                  </div>
                )}
              </StrictModeDroppable>
            </DragDropContext>
          </div>
          <RecipeInstructionInput handleInstructionInput={addInstruction} />
          <p>{errors.instructionItems?.message}</p>
        </div>

        <Controller
          control={control}
          name="servings"
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField>
              <Label>Servings</Label>

              <Input
                type="text"
                placeholder="#"
                onChange={(e) => onChange(allowOnlyNumber(e.target.value))}
                value={value}
              />
              <p>{error && error.message}</p>
            </TextField>
          )}
        />
        <Controller
          control={control}
          name="prepTime"
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField>
              <Label>Prep Time</Label>

              <Input
                type="text"
                placeholder="Minutes"
                onChange={(e) => onChange(allowOnlyNumber(e.target.value))}
                value={value}
              />
              <p>{error && error.message}</p>
            </TextField>
          )}
        />
        <Controller
          control={control}
          name="cookTime"
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField>
              <Label>Cook Time</Label>

              <Input
                type="text"
                placeholder="Minutes"
                onChange={(e) => onChange(allowOnlyNumber(e.target.value))}
                value={value}
              />
              <p>{error && error.message}</p>
            </TextField>
          )}
        />
      </div>
    </form>
  );
};

export default RecipeForm;
