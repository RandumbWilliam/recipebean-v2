import DI from "@database/index";
import { User } from "@entities/user.entity";
import { HttpException } from "@exceptions/httpException";
import UserValidator from "@validators/user.validator";
import argon2 from "argon2";

export class UserService {
  public async findById(userId: string): Promise<User> {
    const user: User | null = await DI.userRepository.findOne({ id: userId });

    if (!user) {
      throw new HttpException(409, "User doesn't exist");
    }

    return user;
  }

  public async updateUser(
    userId: string,
    userData: UserValidator
  ): Promise<User> {
    const findUser: User | null = await DI.userRepository.findOne({
      id: userId,
    });
    if (!findUser) {
      throw new HttpException(409, "User doesn't exist");
    }

    findUser.assign({
      email: userData.email,
      fullName: userData.fullName,
      avatarId: userData.avatarId,
    });
    await DI.em.persistAndFlush(findUser);

    return findUser;
  }

  public async updatePassword(
    userId: string,
    oldPassword: string,
    newPassword: string,
    confirmPassword: string
  ): Promise<User> {
    const findUser: User | null = await DI.userRepository.findOne({
      id: userId,
    });
    if (!findUser) {
      throw new HttpException(409, "User doesn't exist");
    }

    const valid = await argon2.verify(findUser.password, oldPassword);
    if (!valid) {
      throw new HttpException(409, "Invalid credentials");
    }

    if (newPassword !== confirmPassword) {
      throw new HttpException(409, `Passwords do not match`);
    }

    const hashedPassword = await argon2.hash(newPassword);
    findUser.assign({
      password: hashedPassword,
    });

    await DI.em.persistAndFlush(findUser);

    return findUser;
  }

  public async delete(userId: string, password: string) {
    const findUser: User | null = await DI.userRepository.findOne({
      id: userId,
    });
    if (!findUser) {
      throw new HttpException(409, "User doesn't exist");
    }

    const valid = await argon2.verify(findUser.password, password);
    if (!valid) {
      throw new HttpException(409, "Invalid credentials");
    }

    await DI.em.remove(findUser).flush();
  }
}
