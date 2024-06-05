import { cn } from "@/utils/cn";
import { withUrqlClient } from "next-urql";
import Link from "next/link";

import { useGetUserRecipesQuery } from "@/graphql/hooks";

import { urqlClient } from "@/utils/urqlClient";

import RecipeCard from "@/components/RecipeCard";
import { IconBookAdd } from "@/components/icons";
import { Button, buttonVariants } from "@/components/ui/button";
import DefaultLayout from "@/layouts/default";

const Dashboard = () => {
  const [{ data, fetching }] = useGetUserRecipesQuery({
    requestPolicy: "network-only",
  });

  function renderBody() {
    if (fetching) {
      return <div>Loading...</div>;
    }

    if (!data?.getUserRecipes) {
      return <div>Error</div>;
    }

    if (data.getUserRecipes.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center h-[500px] rounded-2xl bg-gray-100">
          <h3>No Recipes</h3>

          <Link href="/recipe/new" className={cn(buttonVariants())}>
            Add Recipe
          </Link>
        </div>
      );
    }

    return (
      <>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {data.getUserRecipes.map((recipe) => (
            <Link key={recipe.id} href={`/recipe/${recipe.id}`}>
              <RecipeCard key={recipe.id} recipe={recipe} />
            </Link>
          ))}
        </div>
        <div className="absolute right-4 bottom-4">
          <button className="flex items-center justify-center w-12 h-12 bg-primary text-white rounded-full p-3 md:hidden">
            <IconBookAdd />
          </button>
        </div>
      </>
    );
  }

  return (
    <DefaultLayout>
      <div className="wrapper">
        <div className="flex flex-col gap-3 mb-6">
          <div className="flex justify-between">
            <h1 className="text-3xl font-semibold">Your Recipes</h1>
            <Link
              href="/recipe/new"
              className={cn(buttonVariants(), "hidden md:flex")}
            >
              Add Recipe
            </Link>
          </div>
        </div>
        {renderBody()}
      </div>
    </DefaultLayout>
  );
};

export default withUrqlClient(urqlClient, { ssr: true })(Dashboard);
