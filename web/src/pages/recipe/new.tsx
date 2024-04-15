import RecipeForm from "@/components/RecipeForm";
import { Button } from "@/components/ui/Button";
import RecipeContextProvider from "@/context/recipe.context";
import DashboardLayout from "@/layouts/dashboard";
import { urqlClient } from "@/utils/urqlClient";
import { withUrqlClient } from "next-urql";

const CreateRecipe = () => {
  return (
    <DashboardLayout>
      <div className="wrapper">
        <div className="flex justify-between mb-6">
          <h1 className="h2-bold">Create Recipe</h1>
          <Button type="button" className="hidden md:block">
            Save
          </Button>
        </div>
        <div className="flex justify-center">
          <RecipeContextProvider>
            <RecipeForm className="w-full max-w-xl gap-6" />
          </RecipeContextProvider>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default withUrqlClient(urqlClient)(CreateRecipe);
