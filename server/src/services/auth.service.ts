import config from "@config";
import { FORGET_PASSWORD_PREFIX } from "@constants";
import DI from "@database/index";
import { User } from "@entities/user.entity";
import { HttpException } from "@exceptions/httpException";
import {
  resetPasswordEmailHTML,
  resetPasswordEmailSubject,
} from "@utils/emails/resetPassword.email";
import { sendEmail } from "@utils/sendEmail";
import UserValidator from "@validators/user.validator";
import argon2 from "argon2";
import crypto from "crypto";
import { Redis } from "ioredis";

export class AuthService {
  public async signup(userData: UserValidator): Promise<User> {
    const findUser: User | null = await DI.userRepository.findOne({
      email: userData.email,
    });
    if (findUser) {
      throw new HttpException(
        409,
        `This email ${userData.email} already exists`
      );
    }

    const hashedPassword = await argon2.hash(userData.password);
    const user: User = DI.userRepository.create({
      ...userData,
      password: hashedPassword,
    });

    await DI.em.persistAndFlush(user);

    return user;
  }

  public async signin(email: string, password: string): Promise<User> {
    const user: User | null = await DI.userRepository.findOne({
      email,
    });
    if (!user) {
      throw new HttpException(409, `Invalid credentials`);
    }

    const valid = await argon2.verify(user.password, password);
    if (!valid) {
      throw new HttpException(409, `Invalid credentials`);
    }

    return user;
  }

  public async forgotPassword(redis: Redis, email: string) {
    const user: User | null = await DI.userRepository.findOne({
      email,
    });

    if (user) {
      const token = crypto.randomUUID();

      const resetLink = `${config.CLIENT_BASE_URL}/reset-password?token=${token}`;

      await redis.set(
        FORGET_PASSWORD_PREFIX + token,
        user.id,
        "EX",
        1000 * 60 * 60 * 24
      );

      await sendEmail(
        email,
        resetPasswordEmailSubject,
        resetPasswordEmailHTML(resetLink)
      );
    }
  }

  public async resetPassword(
    redis: Redis,
    token: string,
    newPassword: string,
    confirmPassword: string
  ) {
    const userId: string | null = await redis.get(
      FORGET_PASSWORD_PREFIX + token
    );
    if (!userId) {
      throw new HttpException(409, `Invalid token`);
    }

    const findUser: User | null = await DI.userRepository.findOne({
      id: userId,
    });

    if (!findUser) {
      throw new HttpException(409, `Invalid token`);
    }

    if (newPassword !== confirmPassword) {
      throw new HttpException(409, `Passwords do not match`);
    }

    const hashedPassword = await argon2.hash(newPassword);
    findUser.assign({
      password: hashedPassword,
    });

    await DI.em.persistAndFlush(findUser);

    await redis.del(FORGET_PASSWORD_PREFIX + token);
  }
}
