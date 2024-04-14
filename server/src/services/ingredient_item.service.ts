import DI from "@database/index";

import { Ingredient } from "@entities/ingredient.entity";
import { IngredientItem } from "@entities/ingredient_item.entity";
import { Recipe } from "@entities/recipe.entity";

import IngredientItemValidator from "@validators/ingredient_item.validator";

export class IngredientItemService {
  public async createMany(
    recipe: Recipe,
    ingredientItemsData: IngredientItemValidator[]
  ) {
    for (const ingredientItemData of ingredientItemsData) {
      const { rank, header, ingredient: ingredientData } = ingredientItemData;

      const ingredientItem: IngredientItem = DI.ingredientItemRepository.create(
        {
          rank,
          header,
          recipe,
        }
      );

      if (ingredientData) {
        const {
          name,
          measurement,
          convertedMeasurement,
          hasAlternativeIngredients,
          hasAddedMeasurements,
          additional,
        } = ingredientData;

        const ingredient: Ingredient = DI.ingredientRepository.create({
          name,
          measurement,
          convertedMeasurement,
          hasAlternativeIngredients,
          hasAddedMeasurements,
          additional,
          ingredientItem,
        });

        await DI.em.persistAndFlush(ingredient);
      }

      await DI.em.persistAndFlush(ingredientItem);
    }
  }
}
