import { cn } from "@/utils/cn";
import { withUrqlClient } from "next-urql";
import Link from "next/link";

import { useGetUserRecipesQuery } from "@/graphql/hooks";

import { urqlClient } from "@/utils/urqlClient";

import RecipeCard from "@/components/RecipeCard";
import { IconBookAdd } from "@/components/icons";
import { Button, buttonVariants } from "@/components/ui/Button";
import DashboardLayout from "@/layouts/dashboard";

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

  return (
    <DashboardLayout>
      <div className="wrapper">
        <div className="flex flex-col gap-3 mb-6">
          <div className="flex justify-between">
            <h1 className="h2-bold">Your Recipes</h1>
            <Link href="/recipe/new" className={cn(buttonVariants())}>
              Add Recipe
            </Link>
          </div>
        </div>
        {renderBody()}
      </div>
    </DashboardLayout>
  );
};

export default withUrqlClient(urqlClient, { ssr: true })(Dashboard);
