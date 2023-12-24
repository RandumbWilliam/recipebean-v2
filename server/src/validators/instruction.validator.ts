import { IsString } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
class InstructionValidator {
  @Field()
  @IsString()
  public text: string;
}

export default InstructionValidator;
