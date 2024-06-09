import DefaultRecipeBanner from "@/assets/default-recipe-banner.jpg";
import { withUrqlClient } from "next-urql";
import Image from "next/image";
import { useRouter } from "next/router";

import { useGetRecipeQuery } from "@/graphql/hooks";
import { twTheme } from "@/utils/twConfig";
import { urqlClient } from "@/utils/urqlClient";

import ServingsCounter from "@/components/ServingsCounter";
import { IconStopwatch } from "@/components/icons";
import {
  InstructionItemValidator,
  MeasurementValidator,
} from "@/graphql/types";
import { ingredientLabel } from "@/helpers/ingredient";
import DefaultLayout from "@/layouts/default";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

const BREAKPOINT_MD = parseInt(twTheme.screens.md.slice(0, -2));

interface TransformInstructionItem extends InstructionItemValidator {
  step?: number | null;
}

const Recipe = () => {
  const router = useRouter();
  const recipeId = typeof router.query.id === "string" ? router.query.id : "";

  const [{ data, fetching }] = useGetRecipeQuery({
    variables: {
      recipeId,
    },
  });
  const [servings, setServings] = useState<number | null>();

  const transformInstructionItems = useMemo(() => {
    let stepCount = 1;
    const transform = data?.getRecipe.instructionItems.map((item) => {
      let newItem: TransformInstructionItem = { ...item };

      if (!item.header) {
        return { ...newItem, step: stepCount++ };
      }

      return newItem;
    });

    return transform;
  }, [data]);

  const transformIngredientItems = useMemo(() => {
    const servingsMultiplier =
      data?.getRecipe.servings && servings
        ? data.getRecipe.servings / servings
        : 1;

    const transform = data?.getRecipe.ingredientItems.map((item) => {
      if (!item.header) {
        item.ingredient.measurement =
          item.ingredient.measurement &&
          item.ingredient.measurement.map(
            (measurment: MeasurementValidator) => {
              measurment.quantity =
                measurment.quantity &&
                measurment.quantity.map(
                  (qty: number) => qty * servingsMultiplier
                );
              return measurment;
            }
          );
      }

      return item;
    });

    return transform;
  }, [data, servings]);

  const handleIncrementServings = () => {
    if (servings) {
      setServings(servings + 1);
    }
  };

  const handleDecrementServings = () => {
    if (servings) {
      setServings(servings - 1);
    }
  };

  const [width, setWidth] = useState(window.innerWidth);

  const handleWindowSizeChange = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);

    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  useEffect(() => {
    setServings(data?.getRecipe.servings);
  }, [data]);

  const isMobile = width < BREAKPOINT_MD;

  function renderBody() {
    if (fetching) {
      return <div>Loading...</div>;
    }

    if (!data?.getRecipe) {
      return <div>Error</div>;
    }

    const { name, imageUrl, prepTime, cookTime } = data.getRecipe;

    return (
      <div className="flex flex-col gap-3">
        {isMobile ? (
          <>
            <div className="flex flex-col gap-3">
              <h2 className="text-2xl font-semibold w-full">{name}</h2>
              <div className="relative w-full h-48 rounded-2xl overflow-hidden">
                <Image
                  src={imageUrl ?? DefaultRecipeBanner.src}
                  alt="cookbook-cover"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover"
                />
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <IconStopwatch className="fill-gray-400" />
              <p>
                <span className="text-gray-400">Prep: </span>
                {prepTime}min
              </p>
              <p>
                <span className="text-gray-400">Cook: </span>
                {cookTime}min
              </p>
            </div>
          </>
        ) : (
          <div className="flex flex-row gap-3">
            <div className="relative w-[400px] h-48 rounded-2xl overflow-hidden">
              <Image
                src={imageUrl ?? DefaultRecipeBanner.src}
                alt="cookbook-cover"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover"
              />
            </div>
            <div className="flex flex-col gap-3 w-full">
              <h2 className="text-2xl font-semibold w-full">{name}</h2>
              <div className="flex items-center gap-1.5">
                <IconStopwatch className="fill-gray-400" />
                {prepTime && (
                  <p>
                    <span className="text-gray-400">Prep: </span>
                    {prepTime}min
                  </p>
                )}
                {cookTime && (
                  <p>
                    <span className="text-gray-400">Cook: </span>
                    {cookTime}min
                  </p>
                )}
                {!cookTime && !prepTime && <p className="text-gray-400">-</p>}
              </div>
            </div>
          </div>
        )}
        <div className="flex flex-col gap-1.5">
          <div className="flex justify-between">
            <p className="text-lg font-medium">Ingredients</p>
            {servings && (
              <ServingsCounter
                servings={servings}
                onIncrement={handleIncrementServings}
                onDecrement={handleDecrementServings}
              />
            )}
          </div>
          <div>
            {!transformIngredientItems ||
            transformIngredientItems.length === 0 ? (
              <p className="text-gray-400">No Ingredients.</p>
            ) : (
              <ul className="list-disc list-inside marker:text-primary">
                {transformIngredientItems.map((ingredientItem, index) => {
                  if (ingredientItem.header) {
                    return (
                      <h5
                        key={`ingredient-item-${index}`}
                        className="text-primary text-lg font-semibold py-2 px-3"
                      >
                        {ingredientItem.header}
                      </h5>
                    );
                  } else {
                    return (
                      <li
                        key={`ingredient-item-${index}`}
                        className="py-2 px-6"
                      >
                        {ingredientLabel(ingredientItem.ingredient)}
                      </li>
                    );
                  }
                })}
              </ul>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-1.5">
          <p className="text-lg font-medium">Instructions</p>
          <div>
            {!transformInstructionItems ||
            transformInstructionItems.length === 0 ? (
              <p className="text-gray-400">No Instructions.</p>
            ) : (
              <ul>
                {transformInstructionItems.map((instructionItem, index) => {
                  if (instructionItem.header) {
                    return (
                      <h5
                        key={`instruction-item-${index}`}
                        className="text-primary text-lg font-semibold py-2 px-3"
                      >
                        {instructionItem.header}
                      </h5>
                    );
                  } else {
                    return (
                      <div
                        key={`instruction-item-${index}`}
                        className="py-2 px-6"
                      >
                        <b className="text-primary">
                          Step {instructionItem.step}
                        </b>
                        <p>{instructionItem.instruction?.text}</p>
                      </div>
                    );
                  }
                })}
              </ul>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <DefaultLayout>
      <div className="wrapper flex flex-col items-center gap-3">
        <div className="flex flex-col w-full max-w-4xl">
          <Link href="/" className="text-primary mb-3">
            Back
          </Link>
          <div>{renderBody()}</div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default withUrqlClient(urqlClient)(Recipe);
