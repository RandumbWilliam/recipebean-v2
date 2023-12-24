import { EntityManager, EntityRepository, MikroORM } from "@mikro-orm/core";

import { Cookbook } from "@entities/cookbook.entity";
import { Ingredient } from "@entities/ingredient.entity";
import { IngredientItem } from "@entities/ingredient_item.entity";
import { Instruction } from "@entities/instruction.entity";
import { InstructionItem } from "@entities/instruction_item.entity";
import { Measurement } from "@entities/measurement.entity";
import { Recipe } from "@entities/recipe.entity";
import { User } from "@entities/user.entity";

const DI = {} as {
  orm: MikroORM;
  em: EntityManager;
  userRepository: EntityRepository<User>;
  cookbookRepository: EntityRepository<Cookbook>;
  recipeRespository: EntityRepository<Recipe>;
  instructionItemRepository: EntityRepository<InstructionItem>;
  instructionRepository: EntityRepository<Instruction>;
  ingredientItemRepository: EntityRepository<IngredientItem>;
  ingredientRepository: EntityRepository<Ingredient>;
  measurementRepostiory: EntityRepository<Measurement>;
};

export default DI;
