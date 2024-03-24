import DI from "@database/index";
import { Cookbook } from "@entities/cookbook.entity";
import { Recipe } from "@entities/recipe.entity";
import { User } from "@entities/user.entity";
import { HttpException } from "@exceptions/httpException";
import CookbookValidator from "@validators/cookbook.validator";

export class CookbookService {
  public async findByUser(user: User): Promise<Cookbook[]> {
    const cookbooks: Cookbook[] = await DI.cookbookRepository.find({ user });

    return cookbooks;
  }

  public async findById(cookbookId: string): Promise<Cookbook | null> {
    const cookbook: Cookbook | null = await DI.cookbookRepository.findOne(
      {
        id: cookbookId,
      },
      {
        populate: ["recipes"],
      }
    );

    return cookbook;
  }

  public async create(
    user: User,
    cookbookData: CookbookValidator
  ): Promise<Cookbook> {
    const cookbook = DI.cookbookRepository.create({
      ...cookbookData,
      user,
    });

    await DI.em.persistAndFlush(cookbook);

    return cookbook;
  }

  public async update(
    cookbookId: string,
    cookbookData: CookbookValidator
  ): Promise<Cookbook> {
    const cookbook: Cookbook | null = await DI.cookbookRepository.findOne(
      {
        id: cookbookId,
      },
      {
        populate: ["recipes"],
      }
    );
    if (!cookbook) {
      throw new HttpException(409, "Cookbook doesn't exist");
    }

    cookbook.assign(cookbookData);
    await DI.em.persistAndFlush(cookbook);

    return cookbook;
  }

  public async delete(cookbookId: string) {
    const cookbook: Cookbook | null = await DI.cookbookRepository.findOne({
      id: cookbookId,
    });
    if (!cookbook) {
      throw new HttpException(409, "Cookbook doesn't exist");
    }

    const removeRecipes: Recipe[] = [];
    const recipes = cookbook.recipes.getItems();
    for (const recipe of recipes) {
      const otherCookbooks = recipe.cookbooks
        .getItems()
        .filter((x) => x.id !== cookbookId);

      if (otherCookbooks.length === 0) {
        removeRecipes.push(recipe);
      }
    }

    await DI.em.remove(removeRecipes).flush();
    await DI.em.remove(cookbook).flush();
  }
}
