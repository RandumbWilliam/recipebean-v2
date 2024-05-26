import { IsArray, IsInt, IsOptional, IsString } from "class-validator";
import { Field, InputType } from "type-graphql";
import IngredientItemValidator from "./ingredient_item.validator";
import InstructionItemValidator from "./instruction_item.validator";

@InputType()
class RecipeValidator {
  @Field()
  @IsString()
  public name: string;

  @Field({ nullable: true })
  @IsInt()
  @IsOptional()
  public servings?: number;

  @Field({ nullable: true })
  @IsInt()
  @IsOptional()
  public prepTime?: number;

  @Field({ nullable: true })
  @IsInt()
  @IsOptional()
  public cookTime?: number;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  public imageUrl?: string;

  @Field(() => [IngredientItemValidator], { nullable: true })
  @IsArray()
  @IsOptional()
  public ingredientItems?: IngredientItemValidator[];

  @Field(() => [InstructionItemValidator], { nullable: true })
  @IsArray()
  @IsOptional()
  public instructionItems?: InstructionItemValidator[];
}

export default RecipeValidator;
