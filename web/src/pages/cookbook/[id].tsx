import { useGetCookbookQuery } from "@/graphql/hooks";
import { urqlClient } from "@/utils/urqlClient";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";

import RecipeCard from "@/components/RecipeCard";
import { IconBookAdd } from "@/components/icons";
import { Button } from "@/components/ui/Button";
import DashboardLayout from "@/layouts/dashboard";

const Cookbook = () => {
  const router = useRouter();
  const cookbookId = typeof router.query.id === "string" ? router.query.id : "";

  const [{ data, fetching }] = useGetCookbookQuery({
    variables: {
      cookbookId,
    },
  });

  function renderBody() {
    if (fetching) {
      return <div>Loading...</div>;
    }

    if (!data?.getCookbook) {
      return <div>Error</div>;
    }

    if (data.getCookbook.recipes.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center h-[500px] rounded-2xl bg-gray-100">
          <h3>No Recipes</h3>

          <Button type="button">Add Recipe</Button>
        </div>
      );
    }

    return (
      <>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {data.getCookbook.recipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
        <div className="absolute right-2 bottom-2">
          <Button className="rounded-full p-3 block md:hidden">
            <IconBookAdd />
          </Button>
        </div>
      </>
    );
  }

  function renderRecipeCount(recipeCount: number) {
    if (recipeCount > 1) {
      return `${recipeCount} recipes`;
    } else {
      return `${recipeCount} recipe`;
    }
  }

  return (
    <DashboardLayout>
      <div className="wrapper">
        <div className="flex justify-between mb-6">
          <div className="flex flex-col gap-3">
            <h1 className="h2-bold">{data?.getCookbook.name}</h1>
            {data?.getCookbook && (
              <p className="ml-2 text-gray-400">
                {renderRecipeCount(data.getCookbook.recipes.length)}
              </p>
            )}
          </div>
          <Button type="button" className="hidden md:block">
            Add Recipe
          </Button>
        </div>
        {renderBody()}
      </div>
    </DashboardLayout>
  );
};

export default withUrqlClient(urqlClient, { ssr: true })(Cookbook);
