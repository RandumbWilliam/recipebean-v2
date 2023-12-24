import DI from "@database/index";

import { Ingredient } from "@entities/ingredient.entity";
import { IngredientItem } from "@entities/ingredient_item.entity";
import { Measurement } from "@entities/measurement.entity";
import { Recipe } from "@entities/recipe.entity";

import IngredientValidator from "@validators/ingredient.validator";
import IngredientItemValidator from "@validators/ingredient_item.validator";
import MeasurementValidator from "@validators/measurement.validator";

export class IngredientItemService {
  public async createMany(
    recipe: Recipe,
    ingredientItemData: IngredientItemValidator[]
  ): Promise<IngredientItem[]> {
    const ingredientItems: IngredientItem[] = [];
    for (const ingredientItemInput of ingredientItemData) {
      const ingredientItem: IngredientItem = DI.ingredientItemRepository.create(
        {
          rank: ingredientItemInput.rank,
          header: ingredientItemInput.header,
          recipe,
        }
      );

      if (ingredientItemInput.ingredient) {
        const ingredientData: IngredientValidator =
          ingredientItemInput.ingredient;
        const ingredient: Ingredient = DI.ingredientRepository.create({
          name: ingredientData.name,
          hasAlternativeIngredients: ingredientData.hasAlternativeIngredients,
          hasAddedMeasurements: ingredientData.hasAddedMeasurements,
          additional: ingredientData.additional,
          ingredientItem,
        });

        if (ingredientData.measurements) {
          const measurementData: MeasurementValidator[] =
            ingredientData.measurements;
          for (const measurementInput of measurementData) {
            const measurement: Measurement = DI.measurementRepostiory.create({
              ...measurementInput,
              ingredient,
            });

            await DI.em.persistAndFlush(measurement);
          }
        }

        await DI.em.persistAndFlush(ingredient);
      }

      await DI.em.persistAndFlush(ingredientItem);

      ingredientItems.push(ingredientItem);
    }

    return ingredientItems;
  }
}
