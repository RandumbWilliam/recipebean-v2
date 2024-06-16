import DI from "@/database";
import { User } from "@/entities/user.entity";
import { HttpException } from "@/exceptions/httpException";
import { AuthChecker } from "type-graphql";

interface RequestWithUser {
  user: User;
}

// @ts-ignore
export const AuthMiddleware = async (req) => {
  try {
    const userId = req.session?.userId;

    if (userId) {
      const user = await DI.userRepository.findOne({ id: userId });
      return user;
    }

    return null;
  } catch (error) {
    throw new HttpException(401, "Wrong authentication token.");
  }
};

export const AuthCheckerMiddleware: AuthChecker<RequestWithUser> = async ({
  context: { user },
}) => {
  if (!user) {
    throw new HttpException(404, "Not authorized");
  }

  return true;
};
