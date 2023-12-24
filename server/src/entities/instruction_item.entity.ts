import { Entity, ManyToOne, OneToOne, Property, types } from "@mikro-orm/core";
import { Field, ObjectType } from "type-graphql";

import InstructionItemValidator from "@validators/instruction_item.validator";

import { Base } from "./base.entity";
import { Instruction } from "./instruction.entity";
import { Recipe } from "./recipe.entity";

@ObjectType({ implements: Base })
@Entity({ tableName: "instruction_items" })
export class InstructionItem extends Base<InstructionItem> {
  @Field()
  @Property({ type: types.integer })
  public rank!: number;

  @Field({ nullable: true })
  @Property({ type: types.string, nullable: true })
  public header?: string;

  @OneToOne(() => Instruction, (Instruction) => Instruction.instructionItem, {
    nullable: true,
  })
  public instruction?: Instruction;

  @ManyToOne(() => Recipe, { onDelete: "cascade" })
  public recipe!: Recipe;

  constructor(body: InstructionItemValidator) {
    super(body);
  }
}
