import { Entity, ManyToOne, OneToOne, Property, types } from "@mikro-orm/core";
import { Field, ObjectType } from "type-graphql";

import IngredientItemValidator from "@validators/ingredient_item.validator";

import { Base } from "./base.entity";
import { Ingredient } from "./ingredient.entity";
import { Recipe } from "./recipe.entity";

@ObjectType({ implements: Base })
@Entity({ tableName: "ingredient_items" })
export class IngredientItem extends Base<IngredientItem> {
  @Field()
  @Property({ type: types.integer })
  public rank!: number;

  @Field({ nullable: true })
  @Property({ type: types.string, nullable: true })
  public header?: string;

  @Field(() => Ingredient)
  @OneToOne(() => Ingredient, (ingredient) => ingredient.ingredientItem, {
    nullable: true,
  })
  public ingredient?: Ingredient;

  @ManyToOne(() => Recipe, { onDelete: "cascade" })
  public recipe!: Recipe;

  constructor(body: IngredientItemValidator) {
    super(body);
  }
}
