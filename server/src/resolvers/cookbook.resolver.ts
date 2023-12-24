import { Cookbook } from "@entities/cookbook.entity";
import { User } from "@entities/user.entity";
import { MyContext } from "@interfaces/context.interface";
import { CookbookService } from "@services/cookbook.service";
import { UserService } from "@services/user.service";
import CookbookValidator from "@validators/cookbook.validator";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";

@Resolver()
export class CookbookResolver {
  public cookbookService = new CookbookService();
  public userService = new UserService();

  @Query(() => [Cookbook])
  async getUserCookbooks(@Ctx() { req }: MyContext): Promise<Cookbook[]> {
    const userId: string = req.session.userId!;

    const user: User = await this.userService.findById(userId);

    const cookbooks: Cookbook[] | null = await this.cookbookService.findByUser(
      user
    );

    return cookbooks;
  }

  @Query(() => Cookbook)
  async getCookbook(
    @Arg("cookbookId") cookbookId: string
  ): Promise<Cookbook | null> {
    const cookbook: Cookbook | null = await this.cookbookService.findById(
      cookbookId
    );

    return cookbook;
  }

  @Mutation(() => Cookbook)
  async createCookbook(
    @Arg("cookbookData") cookbookData: CookbookValidator,
    @Ctx() { req }: MyContext
  ): Promise<Cookbook> {
    const userId: string = req.session.userId!;

    const user: User = await this.userService.findById(userId);

    const cookbook = await this.cookbookService.create(user, cookbookData);

    return cookbook;
  }

  @Mutation(() => Cookbook)
  async updateCookbook(
    @Arg("cookbookData") cookbookData: CookbookValidator,
    @Arg("cookbookId") cookbookId: string
  ): Promise<Cookbook> {
    const cookbook = await this.cookbookService.update(
      cookbookId,
      cookbookData
    );

    return cookbook;
  }

  @Mutation(() => Boolean)
  async deleteCookbook(
    @Arg("cookbookId") cookbookId: string
  ): Promise<boolean> {
    await this.cookbookService.delete(cookbookId);

    return true;
  }
}
