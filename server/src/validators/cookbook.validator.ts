import { CookbookCover } from "@enums/cookbookCover.enum";
import { IsEmail, IsEnum, IsString } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
class CookbookValidator {
  @Field()
  @IsEmail()
  public name: string;

  @Field(() => CookbookCover)
  @IsEnum(CookbookCover)
  public coverId: CookbookCover;
}

export default CookbookValidator;
