import { IsArray, IsInt, IsString } from "class-validator";
import { Field, InputType } from "type-graphql";
import IngredientItemValidator from "./ingredient_item.validator";
import InstructionItemValidator from "./instruction_item.validator";

@InputType()
class RecipeValidator {
  @Field()
  @IsString()
  public name: string;

  @Field()
  @IsInt()
  public servings: number;

  @Field()
  @IsInt()
  public prepTime: number;

  @Field()
  @IsInt()
  public cookTime: number;

  @Field()
  @IsString()
  public imageUrl: string;

  @Field()
  @IsString()
  public imageId: string;

  @Field(() => [IngredientItemValidator])
  @IsArray()
  public ingredientItems: IngredientItemValidator[];

  @Field(() => [InstructionItemValidator])
  @IsArray()
  public instructionItems: InstructionItemValidator[];
}

export default RecipeValidator;
