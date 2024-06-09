import { Entity, OneToOne, Property, types } from "@mikro-orm/core";
import IngredientValidator from "@validators/ingredient.validator";
import { Field, ObjectType } from "type-graphql";
import { Base } from "./base.entity";
import { IngredientItem } from "./ingredient_item.entity";

@ObjectType()
class Measurement {
  @Field(() => [Number], { nullable: true })
  public quantity?: number[];

  @Field({ nullable: true })
  public unit?: string;

  @Field({ nullable: true })
  public unitPlural?: string;

  @Field()
  public isRange: boolean;
}

@ObjectType({ implements: Base })
@Entity({ tableName: "ingredients" })
export class Ingredient extends Base<Ingredient> {
  @Field(() => [String])
  @Property({ type: types.array })
  public name!: string[];

  @Field(() => [Measurement], { nullable: true })
  @Property({ type: types.array, nullable: true })
  public measurement?: Measurement[];

  @Field(() => Measurement, { nullable: true })
  @Property({ type: types.json, nullable: true })
  public convertedMeasurement?: Measurement;

  @Field()
  @Property({ type: types.boolean })
  public hasAlternativeIngredients!: boolean;

  @Field()
  @Property({ type: types.boolean })
  public hasAddedMeasurements!: boolean;

  @Field({ nullable: true })
  @Property({ type: types.string, nullable: true })
  public additional?: string;

  @OneToOne(
    () => IngredientItem,
    (ingredientItem) => ingredientItem.ingredient,
    { owner: true, onDelete: "cascade" }
  )
  public ingredientItem!: IngredientItem;

  constructor(body: IngredientValidator) {
    super(body);
  }
}
