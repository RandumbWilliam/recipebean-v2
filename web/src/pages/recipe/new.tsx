import RecipeForm from "@/components/RecipeForm";
import DashboardLayout from "@/layouts/dashboard";
import { urqlClient } from "@/utils/urqlClient";
import { withUrqlClient } from "next-urql";

const CreateRecipe = () => {
  return (
    <DashboardLayout>
      <div className="wrapper flex justify-center">
        <RecipeForm className="w-full max-w-[960px]" />
      </div>
    </DashboardLayout>
  );
};

export default withUrqlClient(urqlClient)(CreateRecipe);
