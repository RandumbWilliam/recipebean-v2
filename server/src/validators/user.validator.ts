import { UserAvatar } from "@enums/userAvatar.enum";
import { IsEmail, IsEnum, IsString } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
class UserValidator {
  @Field()
  @IsEmail()
  public email: string;

  @Field()
  @IsString()
  public password: string;

  @Field()
  @IsString()
  public fullName: string;

  @Field(() => UserAvatar)
  @IsEnum(UserAvatar)
  public avatarId: UserAvatar;
}

export default UserValidator;
