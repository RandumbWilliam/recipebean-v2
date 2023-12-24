import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";

import { MyContext } from "@interfaces/context.interface";

import { Cookbook } from "@entities/cookbook.entity";
import { Recipe } from "@entities/recipe.entity";
import { User } from "@entities/user.entity";

import { CookbookService } from "@services/cookbook.service";
import { IngredientItemService } from "@services/ingredient_item.service";
import { InstructionItemService } from "@services/instruction_item.service";
import { RecipeService } from "@services/recipe.service";
import { UserService } from "@services/user.service";

import RecipeValidator from "@validators/recipe.validator";

@Resolver()
export class RecipeResolver {
  public recipeService = new RecipeService();
  public cookbookService = new CookbookService();
  public instructionItemService = new InstructionItemService();
  public ingredientItemService = new IngredientItemService();
  public userService = new UserService();

  @Mutation(() => Recipe)
  async createRecipe(
    @Arg("recipeData") recipeData: RecipeValidator,
    @Arg("cookbookIds", () => [String]) cookbookIds: string[],
    @Ctx() { req }: MyContext
  ): Promise<Recipe> {
    const userId: string = req.session.userId!;
    const user: User = await this.userService.findById(userId);

    const recipe = await this.recipeService.create(user, recipeData);

    for (const cookbookId of cookbookIds) {
      const cookbook: Cookbook | null = await this.cookbookService.findById(
        cookbookId
      );

      if (cookbook) {
        cookbook.recipes.add(recipe);
      }
    }

    await this.ingredientItemService.createMany(
      recipe,
      recipeData.ingredientItems
    );

    await this.instructionItemService.createMany(
      recipe,
      recipeData.instructionItems
    );

    return recipe;
  }

  @Mutation(() => Boolean)
  async deleteRecipe(@Arg("recipeId") recipeId: string): Promise<boolean> {
    await this.recipeService.delete(recipeId);

    return true;
  }
}
