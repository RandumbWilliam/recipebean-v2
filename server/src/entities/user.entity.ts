import {
  Cascade,
  Collection,
  Entity,
  Enum,
  OneToMany,
  Property,
  Unique,
  types,
} from "@mikro-orm/core";
import { Field, ObjectType, registerEnumType } from "type-graphql";

import { UserAvatar } from "@enums/userAvatar.enum";

import UserValidator from "@validators/user.validator";

import { Base } from "./base.entity";
import { Recipe } from "./recipe.entity";

registerEnumType(UserAvatar, {
  name: "UserAvatar",
});

@ObjectType({ implements: Base })
@Entity({ tableName: "users" })
export class User extends Base<User> {
  @Field()
  @Unique()
  @Property({ type: types.string })
  public email!: string;

  @Field()
  @Property({ type: types.string })
  public password!: string;

  @Field()
  @Property({ type: types.string })
  public fullName!: string;

  @Field(() => UserAvatar)
  @Enum({ items: () => UserAvatar })
  public avatarId!: UserAvatar;

  @OneToMany({ entity: () => Recipe, mappedBy: "user", cascade: [Cascade.ALL] })
  public recipes = new Collection<Recipe>(this);

  constructor(body: UserValidator) {
    super(body);
  }
}
