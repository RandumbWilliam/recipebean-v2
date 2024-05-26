import DI from "@database/index";
import { Recipe } from "@entities/recipe.entity";
import { User } from "@entities/user.entity";
import { HttpException } from "@exceptions/httpException";
import RecipeValidator from "@validators/recipe.validator";

export class RecipeService {
  public async findByUser(user: User): Promise<Recipe[]> {
    const recipes = await DI.recipeRespository.find({ user });

    return recipes;
  }

  public async findById(recipeId: string): Promise<Recipe | null> {
    const recipe: Recipe | null = await DI.recipeRespository.findOne({
      id: recipeId,
    });

    return recipe;
  }

  public async create(
    user: User,
    recipeData: RecipeValidator
  ): Promise<Recipe> {
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
