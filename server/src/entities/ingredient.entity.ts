import {
  Collection,
  Entity,
  OneToMany,
  OneToOne,
  Property,
  types,
} from "@mikro-orm/core";
import IngredientValidator from "@validators/ingredient.validator";
import { Field, ObjectType } from "type-graphql";
import { Base } from "./base.entity";
import { IngredientItem } from "./ingredient_item.entity";
import { Measurement } from "./measurement.entity";

@ObjectType({ implements: Base })
@Entity({ tableName: "ingredients" })
export class Ingredient extends Base<Ingredient> {
  @Field(() => [String])
  @Property({ type: types.array })
  public name!: string[];

  @Field()
  @Property({ type: types.boolean })
  public hasAlternativeIngredients!: boolean;

  @Field()
  @Property({ type: types.boolean })
  public hasAddedMeasurements!: boolean;

  @Field({ nullable: true })
  @Property({ type: types.string, nullable: true })
  public additional?: string;

  @OneToMany(() => Measurement, (measurement) => measurement.ingredient)
  public measurements = new Collection<Measurement>(this);

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
