import {
  IsArray,
  IsInt,
  IsOptional,
  IsString,
  Max,
  Min,
} from "class-validator";
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
  @Min(1)
  @Max(99)
  @IsOptional()
  public servings?: number;

  @Field({ nullable: true })
  @IsInt()
  @Min(0)
  @Max(6000)
  @IsOptional()
  public prepTime?: number;

  @Field({ nullable: true })
  @IsInt()
  @Min(0)
  @Max(6000)
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
