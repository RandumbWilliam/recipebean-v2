import { IsInt, IsOptional, IsString } from "class-validator";
import { Field, InputType } from "type-graphql";
import IngredientValidator from "./ingredient.validator";

@InputType()
class IngredientItemValidator {
  @Field()
  @IsInt()
  public rank: number;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  public header?: string;

  @Field({ nullable: true })
  @IsOptional()
  public ingredient?: IngredientValidator;
}

export default IngredientItemValidator;
