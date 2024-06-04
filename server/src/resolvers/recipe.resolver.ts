import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";

import { MyContext } from "@interfaces/context.interface";

import { Recipe } from "@entities/recipe.entity";
import { User } from "@entities/user.entity";

import { IngredientItemService } from "@services/ingredient_item.service";
import { InstructionItemService } from "@services/instruction_item.service";
import { RecipeService } from "@services/recipe.service";
import { UserService } from "@services/user.service";

import RecipeValidator from "@validators/recipe.validator";

@Resolver()
export class RecipeResolver {
  public userService = new UserService();
  public recipeService = new RecipeService();
  public instructionItemService = new InstructionItemService();
  public ingredientItemService = new IngredientItemService();

  @Query(() => [Recipe])
  async getUserRecipes(@Ctx() { req }: MyContext): Promise<Recipe[]> {
    const userId: string = req.session.userId!;

    const user: User = await this.userService.findById(userId);

    const recipes: Recipe[] | null = await this.recipeService.findByUser(user);

    return recipes;
  }

  @Query(() => Recipe)
  async getRecipe(@Arg("recipeId") recipeId: string): Promise<Recipe | null> {
    const recipe: Recipe | null = await this.recipeService.findById(recipeId);

    return recipe;
  }

  @Mutation(() => Recipe)
  async createRecipe(
    @Arg("recipeData") recipeData: RecipeValidator,
    @Ctx() { req }: MyContext
  ): Promise<Recipe> {
    const userId: string = req.session.userId!;
    const user: User = await this.userService.findById(userId);

    const recipe = await this.recipeService.create(user, recipeData);

    if (recipeData.ingredientItems) {
      await this.ingredientItemService.createMany(
        recipe,
        recipeData.ingredientItems
      );
    }

    if (recipeData.instructionItems) {
      await this.instructionItemService.createMany(
        recipe,
        recipeData.instructionItems
      );
    }

    return recipe;
  }

  @Mutation(() => Boolean)
  async deleteRecipe(@Arg("recipeId") recipeId: string): Promise<boolean> {
    await this.recipeService.delete(recipeId);

    return true;
  }
}
