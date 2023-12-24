import { CookbookCover } from "@enums/cookbookCover.enum";
import {
  Collection,
  Entity,
  Enum,
  ManyToMany,
  ManyToOne,
  Property,
  types,
} from "@mikro-orm/core";
import CookbookValidator from "@validators/cookbook.validator";
import { Field, ObjectType, registerEnumType } from "type-graphql";
import { Base } from "./base.entity";
import { Recipe } from "./recipe.entity";
import { User } from "./user.entity";

registerEnumType(CookbookCover, {
  name: "CookbookCover",
});

@ObjectType({ implements: Base })
@Entity({ tableName: "cookbooks" })
export class Cookbook extends Base<Cookbook> {
  @Field()
  @Property({ type: types.string })
  public name!: string;

  @Field(() => CookbookCover)
  @Enum({ items: () => CookbookCover })
  public coverId!: CookbookCover;

  @ManyToMany(() => Recipe, "cookbooks", { owner: true })
  public recipes = new Collection<Recipe>(this);

  @ManyToOne(() => User, { onDelete: "cascade" })
  public user!: User;

  constructor(body: CookbookValidator) {
    super(body);
  }
}
