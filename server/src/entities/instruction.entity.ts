import InstructionValidator from "@/validators/instruction.validator";
import { Entity, OneToOne, Property, types } from "@mikro-orm/core";
import { Field, ObjectType } from "type-graphql";
import { Base } from "./base.entity";
import { InstructionItem } from "./instruction_item.entity";

@ObjectType({ implements: Base })
@Entity({ tableName: "instructions" })
export class Instruction extends Base<Instruction> {
  @Field()
  @Property({ type: types.text })
  public text!: string;

  @OneToOne(
    () => InstructionItem,
    (instructionItem) => instructionItem.instruction,
    { owner: true, onDelete: "cascade" }
  )
  public instructionItem!: InstructionItem;

  constructor(body: InstructionValidator) {
    super(body);
  }
}
