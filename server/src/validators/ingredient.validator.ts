import { Type } from "class-transformer";
import { IsArray, IsBoolean, IsOptional, IsString } from "class-validator";
import { Field, InputType } from "type-graphql";
import MeasurementValidator from "./measurement.validator";

@InputType()
class IngredientValidator {
  @Field(() => [String])
  @IsArray()
  public name: string[];

  @Field(() => [MeasurementValidator], { nullable: true })
  @Type(() => MeasurementValidator)
  @IsArray()
  @IsOptional()
  public measurement?: MeasurementValidator[];

  @Field(() => MeasurementValidator, { nullable: true })
  @Type(() => MeasurementValidator)
  @IsOptional()
  public convertedMeasurement?: MeasurementValidator;

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
}

export default IngredientValidator;
