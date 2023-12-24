import { COOKIE_NAME } from "@constants";
import { User } from "@entities/user.entity";
import { MyContext } from "@interfaces/context.interface";
import { UserService } from "@services/user.service";
import UserValidator from "@validators/user.validator";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";

@Resolver()
export class UserResolver {
  public userService = new UserService();

  @Query(() => User)
  async myUser(@Ctx() { req }: MyContext): Promise<User | null> {
    const userId: string = req.session.userId!;
    console.log(req.session);
    const user: User = await this.userService.findById(userId);

    return user;
  }

  @Mutation(() => User)
  async updateUser(
    @Arg("userData") userData: UserValidator,
    @Ctx() { req }: MyContext
  ): Promise<User> {
    const userId: string = req.session.userId!;
    const user: User = await this.userService.updateUser(userId, userData);

    return user;
  }

  @Mutation(() => User)
  async updatePassword(
    @Arg("oldPassword") oldPassword: string,
    @Arg("newPassword") newPassword: string,
    @Arg("confirmPassword") confirmPassword: string,
    @Ctx() { req }: MyContext
  ): Promise<User> {
    const userId: string = req.session.userId!;
    const user: User = await this.userService.updatePassword(
      userId,
      oldPassword,
      newPassword,
      confirmPassword
    );

    return user;
  }

  @Mutation(() => Boolean)
  async delete(
    @Arg("password") password: string,
    @Ctx() { req, res }: MyContext
  ): Promise<boolean> {
    const userId: string = req.session.userId!;
    await this.userService.delete(userId, password);

    return new Promise((resolve) => {
      req.session.destroy((err) => {
        res.clearCookie(COOKIE_NAME);
        if (err) {
          resolve(false);
          return;
        }

        resolve(true);
      });
    });
  }
}
