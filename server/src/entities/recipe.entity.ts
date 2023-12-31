import {
  Cascade,
  Collection,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  Property,
  types,
} from "@mikro-orm/core";
import RecipeValidator from "@validators/recipe.validator";
import { Field, ObjectType } from "type-graphql";
import { Base } from "./base.entity";
import { Cookbook } from "./cookbook.entity";
import { IngredientItem } from "./ingredient_item.entity";
import { InstructionItem } from "./instruction_item.entity";
import { User } from "./user.entity";

@ObjectType({ implements: Base })
@Entity({ tableName: "recipes" })
export class Recipe extends Base<Recipe> {
  @Field()
  @Property({ type: types.string })
  public name!: string;

  @Field()
  @Property({ type: types.integer })
  public servings!: number;

  @Field()
  @Property({ type: types.integer })
  public prepTime!: number;

  @Field()
  @Property({ type: types.integer })
  public cookTime!: number;

  @Field()
  @Property({ type: types.string })
  public imageUrl!: string;

  @Field()
  @Property({ type: types.string })
  public imageId!: string;

  @OneToMany(() => IngredientItem, (ingredientItem) => ingredientItem.recipe)
  public ingredientItems = new Collection<IngredientItem>(this);

  @OneToMany(() => InstructionItem, (isntructionItem) => isntructionItem.recipe)
  public instructionItems = new Collection<InstructionItem>(this);

  @ManyToMany(() => Cookbook, (cookbook) => cookbook.recipes)
  public cookbooks = new Collection<Cookbook>(this);

  @ManyToOne(() => User)
  public user!: User;

  constructor(body: RecipeValidator) {
    super(body);
  }
}
