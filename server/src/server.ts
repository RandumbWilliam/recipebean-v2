import { App } from "@/app";

import { AuthResolver } from "@resolvers/auth.resolver";
import { RecipeResolver } from "@resolvers/recipe.resolver";
import { UserResolver } from "@resolvers/user.resolver";

const app = new App([AuthResolver, UserResolver, RecipeResolver]);

app.listen();
