import DefaultRecipeBanner from "@/assets/default-recipe-banner.jpg";
import { RecipeResponseFragment } from "@/graphql/operations";
import Image from "next/image";
import React, { useMemo } from "react";
import { IconStopwatch } from "./icons";

interface RecipeCardProps {
  className?: string;
  recipe: RecipeResponseFragment;
}

function convertMinutesToHoursAndMinutes(minutes: number) {
  var hours = Math.floor(minutes / 60);
  var remainingMinutes = minutes % 60;
  var result = "";
  if (hours > 0) {
    result += hours + "h ";
  }
  if (remainingMinutes > 0 || result === "") {
    result += remainingMinutes + "m";
  }
  return result;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ className, recipe }) => {
  const totalTime = useMemo(() => {
    const totalMinutes = (recipe.cookTime ?? 0) + (recipe.prepTime ?? 0);
    return convertMinutesToHoursAndMinutes(totalMinutes);
  }, [recipe.cookTime, recipe.prepTime]);

  return (
    <div>
      <div className="relative w-full h-48 rounded-2xl overflow-hidden">
        <Image
          src={recipe.imageUrl ?? DefaultRecipeBanner.src}
          alt="cookbook-cover"
          fill={true}
          className="object-cover"
        />
      </div>
      <div>
        <p className="p-medium-24">{recipe.name}</p>
        <div className="flex items-center gap-1.5">
          <IconStopwatch className="fill-gray-400" />
          <p className="text-gray-400">{totalTime}</p>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
