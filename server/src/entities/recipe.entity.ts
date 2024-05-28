import {
  Collection,
  Entity,
  ManyToOne,
  OneToMany,
  Property,
  types,
} from "@mikro-orm/core";
import RecipeValidator from "@validators/recipe.validator";
import { Field, ObjectType } from "type-graphql";
import { Base } from "./base.entity";
import { IngredientItem } from "./ingredient_item.entity";
import { InstructionItem } from "./instruction_item.entity";
import { User } from "./user.entity";

@ObjectType({ implements: Base })
@Entity({ tableName: "recipes" })
export class Recipe extends Base<Recipe> {
  @Field()
  @Property({ type: types.string })
  public name!: string;

  @Field({ nullable: true })
  @Property({ type: types.integer, nullable: true })
  public servings?: number;

  @Field({ nullable: true })
  @Property({ type: types.integer, nullable: true })
  public prepTime?: number;

  @Field({ nullable: true })
  @Property({ type: types.integer, nullable: true })
  public cookTime?: number;

  @Field({ nullable: true })
  @Property({ type: types.string, nullable: true })
  public imageUrl?: string;

  @OneToMany(() => IngredientItem, (ingredientItem) => ingredientItem.recipe)
  public ingredientItems = new Collection<IngredientItem>(this);

  @OneToMany(() => InstructionItem, (isntructionItem) => isntructionItem.recipe)
  public instructionItems = new Collection<InstructionItem>(this);

  @ManyToOne(() => User)
  public user!: User;

  constructor(body: RecipeValidator) {
    super(body);
  }
}
