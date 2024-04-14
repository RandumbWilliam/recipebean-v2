import { IsArray, IsBoolean, IsOptional, IsString } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
class MeasurementValidator {
  @Field(() => [Number], { nullable: true })
  @IsArray()
  @IsOptional()
  public quantity?: number[];

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  public unit?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  public unitPlural?: string;

  @Field()
  @IsBoolean()
  public isRange: boolean;
}

export default MeasurementValidator;
