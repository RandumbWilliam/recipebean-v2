import { IsInt, IsOptional, IsString } from "class-validator";
import { Field, InputType } from "type-graphql";
import InstructionValidator from "./instruction.validator";

@InputType()
class InstructionItemValidator {
  @Field()
  @IsInt()
  public rank: number;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  public header?: string;

  @Field({ nullable: true })
  @IsOptional()
  public instruction?: InstructionValidator;
}

export default InstructionItemValidator;
