import DI from "@database/index";

import { Instruction } from "@entities/instruction.entity";
import { InstructionItem } from "@entities/instruction_item.entity";
import { Recipe } from "@entities/recipe.entity";

import InstructionValidator from "@validators/instruction.validator";
import InstructionItemValidator from "@validators/instruction_item.validator";

export class InstructionItemService {
  public async createMany(
    recipe: Recipe,
    instructionItemData: InstructionItemValidator[]
  ): Promise<InstructionItem[]> {
    const instructionItems: InstructionItem[] = [];
    for (const instructionItemInput of instructionItemData) {
      const instructionItem: InstructionItem =
        DI.instructionItemRepository.create({
          rank: instructionItemInput.rank,
          header: instructionItemInput.header,
          recipe,
        });

      if (instructionItemInput.instruction) {
        const instructionData: InstructionValidator =
          instructionItemInput.instruction;
        const instruction: Instruction = DI.instructionRepository.create({
          text: instructionData.text,
          instructionItem,
        });

        await DI.em.persistAndFlush(instruction);
      }

      await DI.em.persistAndFlush(instructionItem);

      instructionItems.push(instructionItem);
    }

    return instructionItems;
  }
}
