import { component$, Resource, useStylesScoped$ } from "@builder.io/qwik";
import { RequestHandler, useEndpoint } from "@builder.io/qwik-city";
import { recipesClient } from "~/services/recipesClient";
import { RecipeContent } from "~/types";
import styles from "./index.css";

type ComposedTitleAndContentResponse = {
  title: string | null;
  content: RecipeContent | null;
};

export const onGet: RequestHandler<ComposedTitleAndContentResponse> = async ({
  params,
}) => {
  const response = await Promise.all([
    recipesClient.getRecipeContent(params.id),
    recipesClient.getRecipeTitle(params.id),
  ]);

  return {
    content: response[0],
    title: response[1],
  };
};

export default component$(() => {
  useStylesScoped$(styles);
  const recipe = useEndpoint<ComposedTitleAndContentResponse>();

  return (
    <Resource
      value={recipe}
      onPending={() => <div>Loading...</div>}
      onRejected={() => <div>Error</div>}
      onResolved={(recipe) => (
        <>
          <h1>{recipe?.title}</h1>
          <h2>Ingredients</h2>
          <ul>
            {recipe?.content?.ingredients.map((ingredient) => {
              return <li>{ingredient}</li>;
            })}
          </ul>
          <h2>Preparation</h2>
          <ol>
            {recipe?.content?.preparationSteps.map((preparationStep) => {
              return <li>{preparationStep}</li>;
            })}
          </ol>
        </>
      )}
    />
  );
});
