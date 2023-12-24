import { COOKIE_NAME } from "@constants";
import { User } from "@entities/user.entity";
import { MyContext } from "@interfaces/context.interface";
import { AuthService } from "@services/auth.service";
import UserValidator from "@validators/user.validator";
import { Arg, Ctx, Mutation, Resolver } from "type-graphql";

@Resolver()
export class AuthResolver {
  public authService = new AuthService();

  @Mutation(() => User)
  async signup(
    @Arg("userData") userData: UserValidator,
    @Ctx() { req }: MyContext
  ): Promise<User> {
    const user: User = await this.authService.signup(userData);

    req.session!.userId = user.id;

    return user;
  }

  @Mutation(() => User)
  async login(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Ctx() { req }: MyContext
  ): Promise<User> {
    const user: User = await this.authService.login(email, password);

    req.session!.userId = user.id;

    console.log(req.session);

    return user;
  }

  @Mutation(() => Boolean)
  async logout(@Ctx() { req, res }: MyContext): Promise<boolean> {
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

  @Mutation(() => Boolean)
  async forgotPassword(
    @Arg("email") email: string,
    @Ctx() { redis }: MyContext
  ): Promise<boolean> {
    await this.authService.forgotPassword(redis, email);
    return true;
  }

  @Mutation(() => Boolean)
  async resetPassword(
    @Arg("token") token: string,
    @Arg("newPassword") newPassword: string,
    @Arg("confirmPassword") confirmPassword: string,
    @Ctx() { redis }: MyContext
  ): Promise<boolean> {
    await this.authService.resetPassword(
      redis,
      token,
      newPassword,
      confirmPassword
    );
    return true;
  }
}
