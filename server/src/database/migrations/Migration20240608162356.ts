import { Migration } from '@mikro-orm/migrations';

export class Migration20240608162356 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "users" ("id" uuid not null, "created_at" date not null, "updated_at" date not null, "email" varchar(255) not null, "password" varchar(255) not null, "full_name" varchar(255) not null, "avatar_id" smallint not null, constraint "users_pkey" primary key ("id"));');
    this.addSql('alter table "users" add constraint "users_email_unique" unique ("email");');

    this.addSql('create table "recipes" ("id" uuid not null, "created_at" date not null, "updated_at" date not null, "name" varchar(255) not null, "servings" int null, "prep_time" int null, "cook_time" int null, "image_url" varchar(255) null, "user_id" uuid not null, constraint "recipes_pkey" primary key ("id"));');

    this.addSql('create table "instruction_items" ("id" uuid not null, "created_at" date not null, "updated_at" date not null, "rank" int not null, "header" varchar(255) null, "recipe_id" uuid not null, constraint "instruction_items_pkey" primary key ("id"));');

    this.addSql('create table "instructions" ("id" uuid not null, "created_at" date not null, "updated_at" date not null, "text" text not null, "instruction_item_id" uuid not null, constraint "instructions_pkey" primary key ("id"));');
    this.addSql('alter table "instructions" add constraint "instructions_instruction_item_id_unique" unique ("instruction_item_id");');

    this.addSql('create table "ingredient_items" ("id" uuid not null, "created_at" date not null, "updated_at" date not null, "rank" int not null, "header" varchar(255) null, "recipe_id" uuid not null, constraint "ingredient_items_pkey" primary key ("id"));');

    this.addSql('create table "ingredients" ("id" uuid not null, "created_at" date not null, "updated_at" date not null, "name" text[] not null, "measurement" text[] null, "converted_measurement" jsonb null, "has_alternative_ingredients" boolean not null, "has_added_measurements" boolean not null, "additional" varchar(255) null, "ingredient_item_id" uuid not null, constraint "ingredients_pkey" primary key ("id"));');
    this.addSql('alter table "ingredients" add constraint "ingredients_ingredient_item_id_unique" unique ("ingredient_item_id");');

    this.addSql('alter table "recipes" add constraint "recipes_user_id_foreign" foreign key ("user_id") references "users" ("id") on update cascade;');

    this.addSql('alter table "instruction_items" add constraint "instruction_items_recipe_id_foreign" foreign key ("recipe_id") references "recipes" ("id") on update cascade on delete cascade;');

    this.addSql('alter table "instructions" add constraint "instructions_instruction_item_id_foreign" foreign key ("instruction_item_id") references "instruction_items" ("id") on update cascade on delete cascade;');

    this.addSql('alter table "ingredient_items" add constraint "ingredient_items_recipe_id_foreign" foreign key ("recipe_id") references "recipes" ("id") on update cascade on delete cascade;');

    this.addSql('alter table "ingredients" add constraint "ingredients_ingredient_item_id_foreign" foreign key ("ingredient_item_id") references "ingredient_items" ("id") on update cascade on delete cascade;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "recipes" drop constraint "recipes_user_id_foreign";');

    this.addSql('alter table "instruction_items" drop constraint "instruction_items_recipe_id_foreign";');

    this.addSql('alter table "ingredient_items" drop constraint "ingredient_items_recipe_id_foreign";');

    this.addSql('alter table "instructions" drop constraint "instructions_instruction_item_id_foreign";');

    this.addSql('alter table "ingredients" drop constraint "ingredients_ingredient_item_id_foreign";');

    this.addSql('drop table if exists "users" cascade;');

    this.addSql('drop table if exists "recipes" cascade;');

    this.addSql('drop table if exists "instruction_items" cascade;');

    this.addSql('drop table if exists "instructions" cascade;');

    this.addSql('drop table if exists "ingredient_items" cascade;');

    this.addSql('drop table if exists "ingredients" cascade;');
  }

}
