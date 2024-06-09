import { ingredientLabel } from "@/helpers/ingredient.js";
import { cn } from "@/utils/cn";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
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

import { RecipeValidator } from "@/graphql/types";
import Link from "next/link";
import { DropZone, FileTrigger, TextField } from "react-aria-components";
import IngredientInput, { type IngredientItem } from "./IngredientInput";
import InstructionInput, { type InstructionItem } from "./InstructionInput";
import RecipeIngredientInput from "./RecipeIngredientInput";
import RecipeInstructionInput from "./RecipeInstructionInput";
import { IconLeftArrowAlt, IconMenu, IconTrash, IconX } from "./icons";
import { Input } from "./ui/Input";
import { Label } from "./ui/Label";
import { Button } from "./ui/button";

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

interface RecipeFormProps {
  className?: string;
  onSave: (recipeData: RecipeValidator) => void;
}

const ingredientValidationSchmea = z.object({
  header: z.string().nullish(),
  ingredient: z
    .object({
      name: z.array(z.string()),
      measurement: z
        .array(
          z.object({
            isRange: z.boolean(),
            quantity: z.array(z.number()).optional().nullable(),
            unit: z.string().optional().nullable(),
            unitPlural: z.string().optional().nullable(),
          })
        )
        .optional()
        .nullable(),
      convertedMeasurement: z
        .object({
          isRange: z.boolean(),
          quantity: z.array(z.number()).optional().nullable(),
          unit: z.string().optional().nullable(),
          unitPlural: z.string().optional().nullable(),
        })
        .optional()
        .nullable(),
      hasAddedMeasurements: z.boolean(),
      hasAlternativeIngredients: z.boolean(),
      additional: z.string().optional().nullable(),
    })
    .nullish(),
});

const instructionValidationSchema = z.object({
  step: z.number().nullish(),
  header: z.string().nullish(),
  instruction: z
    .object({
      text: z.string(),
    })
    .nullish(),
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
    .pipe(z.number().int().gte(1).lte(99).finite().optional()),
  prepTime: z
    .any()
    .transform((val) => {
      if (val === undefined || val === "") return undefined;

      return Number(val);
    })
    .pipe(z.number().int().gte(0).lte(6000).finite().optional()),
  cookTime: z
    .any()
    .transform((val) => {
      if (val === undefined || val === "") return undefined;

      return Number(val);
    })
    .pipe(z.number().int().gte(0).lte(6000).finite().optional()),
  imageUrl: z.string().nullish(),
  ingredientItems: z.array(ingredientValidationSchmea).optional().default([]),
  instructionItems: z.array(instructionValidationSchema).optional().default([]),
});

type RecipeData = z.infer<typeof validationSchema>;

const RecipeForm: React.FC<RecipeFormProps> = ({ className, onSave }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [reorderIngredient, setReorderIngredient] = useState(false);
  const [reorderInstruction, setReorderInstruction] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    setError,
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

  const transformInstructionItemFields = useMemo(() => {
    let stepCount = 1;
    const transform = instructionItemFields.map((item) => {
      if (!item.header) {
        return { ...item, step: stepCount++ };
      }

      return item;
    });

    return transform;
  }, [instructionItemFields]);

  const allowOnlyNumber = (value: string) => {
    return value.replace(/[^0-9]/g, "");
  };

  const onSubmit = (data: RecipeData) => {
    const ingredientItems = data.ingredientItems.map((item, index) => ({
      ...item,
      rank: index,
    }));

    const instructionItems = data.instructionItems.map((item, index) => ({
      header: item.header,
      instruction: item.instruction,
      rank: index,
    }));

    const recipeData = {
      name: data.name,
      servings: data.servings || null,
      prepTime: data.prepTime || null,
      cookTime: data.cookTime || null,
      imageUrl: data.imageUrl || null,
      ingredientItems,
      instructionItems,
    };

    onSave(recipeData);
  };

  const MAX_FILE_SIZE = 6 * 1024 * 1024; // 6 MB
  const handleRecipeBanner = (file: File) => {
    return new Promise<string>((resolve, reject) => {
      if (file.size > MAX_FILE_SIZE) {
        reject(new Error("File size exceeds the maximum limit."));
        return;
      }
      const fileReader = new FileReader();
      fileReader.onload = () => resolve(fileReader.result as string);
      fileReader.readAsDataURL(file);
    });
  };

  const addIngredient = (ingredientItem: IngredientItem) => {
    ingredientItemAppend(ingredientItem);
  };

  const addInstruction = (instructionItem: InstructionItem) => {
    instructionItemAppend(instructionItem);
  };

  const updateIngredientItem = (index: number, item: IngredientItem) => {
    ingredientItemUpdate(index, item);
  };

  const updateInstructionItem = (index: number, item: InstructionItem) => {
    instructionItemUpdate(index, item);
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
      <div className="flex w-full items-center justify-between mb-6">
        <div className="flex gap-3 items-center">
          <Link
            href="/dashboard"
            className="flex items-center justify-center rounded-md bg-secondary h-7 w-7"
          >
            <IconLeftArrowAlt className="h-5 w-5 fill-secondary-foreground" />
          </Link>
          <h1 className="text-2xl font-bold">Create Recipe</h1>
        </div>
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
          <Controller
            control={control}
            name="imageUrl"
            defaultValue=""
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <>
                <Label>Cover Image</Label>
                <p>{error && error.message}</p>
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
                          onClick={() => onChange(null)}
                        >
                          <IconTrash />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <DropZone
                      className="flex h-[220px] w-full flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed text-sm data-[drop-target]:border-solid data-[drop-target]:border-primary data-[drop-target]:bg-primary/10"
                      onDrop={async (e) => {
                        let item = e.items.find(
                          (item) =>
                            item.kind === "file" &&
                            (item.type === "image/jpeg" ||
                              item.type === "image/png")
                        ) as FileDropItem;
                        if (item) {
                          const imageFile = await item.getFile();
                          handleRecipeBanner(imageFile)
                            .then((result: string) => {
                              onChange(result);
                            })
                            .catch((error: Error) => {
                              setError("imageUrl", {
                                message: error.message,
                              });
                            });
                          // const imageUrl = URL.createObjectURL(imageFile);
                          // onChange(imageUrl);
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
                            handleRecipeBanner(imageFile)
                              .then((result: string) => {
                                onChange(result);
                              })
                              .catch((error: Error) => {
                                setError("imageUrl", {
                                  message: error.message,
                                });
                              });
                            // const imageUrl = URL.createObjectURL(imageFile);
                            // onChange(imageUrl);
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
              </>
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
                className="text-primary font-semibold"
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
                                  <h5 className="text-primary text-lg font-semibold py-2 px-3">
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
                          <IngredientInput
                            key={field.id}
                            reorder={reorderIngredient}
                            item={{
                              header: field.header,
                              ingredient: field.ingredient,
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
                className="text-primary font-semibold"
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
                    {transformInstructionItemFields.map((field, index) => {
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
                                  <h5 className="text-primary text-lg font-semibold py-2 px-3">
                                    {field.header}
                                  </h5>
                                ) : (
                                  <div className="py-2 px-6">
                                    <b className="text-primary">
                                      Step {field.step}
                                    </b>
                                    <p>{field.instruction?.text}</p>
                                  </div>
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
                          <InstructionInput
                            key={field.id}
                            reorder={reorderInstruction}
                            item={{
                              step: field.step,
                              header: field.header,
                              instruction: field.instruction,
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
