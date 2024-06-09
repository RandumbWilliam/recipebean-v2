import DI from "@database/index";
import { Recipe } from "@entities/recipe.entity";
import { User } from "@entities/user.entity";
import { HttpException } from "@exceptions/httpException";
import * as cloudinary from "@utils/cloudinary";
import RecipeValidator from "@validators/recipe.validator";

export class RecipeService {
  public async findByUser(user: User): Promise<Recipe[]> {
    const recipes = await DI.recipeRespository.find({ user });

    return recipes;
  }

  public async findById(recipeId: string): Promise<Recipe | null> {
    const recipe: Recipe | null = await DI.recipeRespository.findOne(
      {
        id: recipeId,
      },
      {
        populate: [
          "ingredientItems",
          "instructionItems",
          "ingredientItems.ingredient",
          "instructionItems.instruction",
        ],
      }
    );

    return recipe;
  }

  public async create(
    user: User,
    recipeData: RecipeValidator
  ): Promise<Recipe> {
    if (recipeData.imageUrl && cloudinary.validateBase64(recipeData.imageUrl)) {
      const recipeBannerUrl = await cloudinary.upload(recipeData.imageUrl);

      recipeData.imageUrl = recipeBannerUrl;
    }

    const recipe = DI.recipeRespository.create({
      name: recipeData.name,
      servings: recipeData.servings,
      prepTime: recipeData.prepTime,
      cookTime: recipeData.cookTime,
      imageUrl: recipeData.imageUrl,
      user,
    });

    await DI.em.persistAndFlush(recipe);

    return recipe;
  }

  public async delete(recipeId: string) {
    const recipe: Recipe | null = await DI.recipeRespository.findOne({
      id: recipeId,
    });
    if (!recipe) {
      throw new HttpException(409, "Recipe doesn't exist");
    }

    await DI.em.remove(recipe).flush();
  }
}
