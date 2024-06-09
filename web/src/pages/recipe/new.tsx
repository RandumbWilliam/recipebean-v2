import RecipeForm from "@/components/RecipeForm";
import { useCreateRecipeMutation } from "@/graphql/hooks";
import { RecipeValidator } from "@/graphql/types";
import DefaultLayout from "@/layouts/default";
import { urqlClient } from "@/utils/urqlClient";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";

const CreateRecipe = () => {
  const router = useRouter();

  const [, createRecipe] = useCreateRecipeMutation();

  const onSave = async (recipeData: RecipeValidator) => {
    const result = await createRecipe({ recipeData });

    if (result.data?.createRecipe) {
      router.push(`/recipe/${result.data.createRecipe.id}`);
    }
  };

  return (
    <DefaultLayout>
      <div className="wrapper flex justify-center">
        <RecipeForm className="w-full max-w-[960px]" onSave={onSave} />
      </div>
    </DefaultLayout>
  );
};

export default withUrqlClient(urqlClient)(CreateRecipe);
