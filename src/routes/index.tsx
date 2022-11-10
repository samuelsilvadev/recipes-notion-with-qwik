import { component$, Resource, useStylesScoped$ } from "@builder.io/qwik";
import {
  DocumentHead,
  Link,
  RequestHandler,
  useEndpoint,
} from "@builder.io/qwik-city";
import { recipesClient } from "~/services/recipesClient";
import { PartialRecipe } from "~/types";
import styles from "./index.css";

export const onGet: RequestHandler<PartialRecipe[]> = async () => {
  return await recipesClient.getPartialRecipes();
};

export default component$(() => {
  useStylesScoped$(styles);

  const recipes = useEndpoint<PartialRecipe[]>();

  return (
    <Resource
      value={recipes}
      onPending={() => <div>Loading...</div>}
      onRejected={() => <div>Error</div>}
      onResolved={(recipes) => (
        <>
          <h1>Recipes</h1>
          <ul>
            {recipes.map(({ id, title }) => (
              <li key={id}>
                <Link href={`/recipe/${id}`}>{title}</Link>
              </li>
            ))}
          </ul>
        </>
      )}
    />
  );
});

export const head: DocumentHead = {
  title: "Recipes",
};
