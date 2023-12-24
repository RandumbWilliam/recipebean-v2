import { Entity, ManyToOne, Property, types } from "@mikro-orm/core";
import MeasurementValidator from "@validators/measurement.validator";
import { Field, ObjectType } from "type-graphql";
import { Base } from "./base.entity";
import { Ingredient } from "./ingredient.entity";

@ObjectType({ implements: Base })
@Entity({ tableName: "measurements" })
export class Measurement extends Base<Measurement> {
  @Field(() => [Number], { nullable: true })
  @Property({ type: types.array, nullable: true })
  public quantity?: number[];

  @Field({ nullable: true })
  @Property({ type: types.string, nullable: true })
  public unit?: string;

  @Field({ nullable: true })
  @Property({ type: types.string, nullable: true })
  public unitPlural?: string;

  @Field()
  @Property({ type: types.boolean })
  public isRange!: boolean;

  @Field()
  @Property({ type: types.boolean })
  public isConverted!: boolean;

  @ManyToOne(() => Ingredient, { onDelete: "cascade" })
  public ingredient!: Ingredient;

  constructor(body: MeasurementValidator) {
    super(body);
  }
}
