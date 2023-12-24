import { IsArray, IsBoolean, IsOptional, IsString } from "class-validator";
import { Field, InputType } from "type-graphql";
import MeasurementValidator from "./measurement.validator";

@InputType()
class IngredientValidator {
  @Field(() => [String])
  @IsArray()
  public name: string[];

  @Field()
  @IsBoolean()
  public hasAlternativeIngredients: boolean;

  @Field()
  @IsBoolean()
  public hasAddedMeasurements: boolean;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  public additional?: string;

  @Field(() => [MeasurementValidator], { nullable: true })
  @IsArray()
  public measurements?: MeasurementValidator[];
}

export default IngredientValidator;
