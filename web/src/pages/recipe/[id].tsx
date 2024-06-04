import DefaultRecipeBanner from "@/assets/default-recipe-banner.jpg";
import { withUrqlClient } from "next-urql";
import Image from "next/image";
import { useRouter } from "next/router";

import { useGetRecipeQuery } from "@/graphql/hooks";
import DashboardLayout from "@/layouts/dashboard";
import { twTheme } from "@/utils/twConfig";
import { urqlClient } from "@/utils/urqlClient";

import ServingsCounter from "@/components/ServingsCounter";
import { IconStopwatch } from "@/components/icons";
import Link from "next/link";
import { useEffect, useState } from "react";

const BREAKPOINT_MD = parseInt(twTheme.screens.md.slice(0, -2));

const Recipe = () => {
  const router = useRouter();
  const recipeId = typeof router.query.id === "string" ? router.query.id : "";

  const [{ data, fetching }] = useGetRecipeQuery({
    variables: {
      recipeId,
    },
  });
  const [servings, setServings] = useState(data?.getRecipe.servings ?? 0);

  const handleIncrementServings = () => {
    setServings(servings + 1);
  };

  const handleDecrementServings = () => {
    setServings(servings - 1);
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

  const isMobile = width < BREAKPOINT_MD;

  function renderBody() {
    if (fetching) {
      return <div>Loading...</div>;
    }

    if (!data?.getRecipe) {
      return <div>Error</div>;
    }

    const {
      name,
      imageUrl,
      prepTime,
      cookTime,
      ingredientItems,
      instructionItems,
    } = data.getRecipe;

    return (
      <div className="flex flex-col gap-3">
        {isMobile ? (
          <>
            <div className="flex flex-col gap-3">
              <h2 className="h2-bold w-full">{name}</h2>
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
              <h2 className="h2-bold w-full">{name}</h2>
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
            </div>
          </div>
        )}
        <div className="flex flex-col gap-3">
          <div className="flex justify-between">
            <p className="p-medium-24">Ingredients</p>
            <ServingsCounter
              servings={servings}
              onIncrement={handleIncrementServings}
              onDecrement={handleDecrementServings}
            />
          </div>
          <div>
            {ingredientItems.length === 0 ? (
              <p className="text-gray-400">No Ingredients.</p>
            ) : (
              <ul>
                {ingredientItems.map((ingredientItem, index) => (
                  <div key={`ingredient-item-${index}`}>
                    {JSON.stringify(ingredientItem)}
                  </div>
                ))}
              </ul>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <p className="p-medium-24">Instructions</p>
          <div>
            {instructionItems.length === 0 ? (
              <p className="text-gray-400">No Instructions.</p>
            ) : (
              <ul>
                {instructionItems.map((instructionItem, index) => (
                  <div key={`ingredient-item-${index}`}>
                    {JSON.stringify(instructionItem)}
                  </div>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <DashboardLayout>
      <div className="wrapper flex flex-col gap-3">
        <Link href="/" className="text-brink-pink-500">
          Back
        </Link>
        {renderBody()}
      </div>
    </DashboardLayout>
  );
};

export default withUrqlClient(urqlClient)(Recipe);
