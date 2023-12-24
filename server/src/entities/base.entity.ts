import { BaseEntity, PrimaryKey, Property, types } from "@mikro-orm/core";
import crypto from "crypto";
import { Field, ID, InterfaceType } from "type-graphql";

@InterfaceType()
export abstract class Base<T extends { id: string }> extends BaseEntity<
  T,
  "id"
> {
  @Field(() => ID)
  @PrimaryKey({ type: types.uuid })
  public id: string = crypto.randomUUID();

  @Field()
  @Property({ type: types.date })
  public createdAt?: Date = new Date();

  @Field()
  @Property({ type: types.date, onUpdate: () => new Date() })
  public updatedAt?: Date = new Date();

  constructor(body = {}) {
    super();
    this.assign(body);
  }
}
