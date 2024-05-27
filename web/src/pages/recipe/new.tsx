import RecipeForm from "@/components/RecipeForm";
import { useCreateRecipeMutation } from "@/graphql/hooks";
import { RecipeValidator } from "@/graphql/types";
import DashboardLayout from "@/layouts/dashboard";
import { urqlClient } from "@/utils/urqlClient";
import { withUrqlClient } from "next-urql";

const CreateRecipe = () => {
  const [, createRecipe] = useCreateRecipeMutation();

  const onSave = async (cookbookIds: string[], recipeData: RecipeValidator) => {
    const result = await createRecipe({ cookbookIds, recipeData });

    if (result.data?.createRecipe) {
      console.log(result.data.createRecipe);
    }
  };

  return (
    <DashboardLayout>
      <div className="wrapper flex justify-center">
        <RecipeForm className="w-full max-w-[960px]" onSave={onSave} />
      </div>
    </DashboardLayout>
  );
};

export default withUrqlClient(urqlClient)(CreateRecipe);
