import * as model from "./model.js";
import recipeView from "./views/recipeView.js";
import "core-js/stable";
import "regenerator-runtime/runtime";
import searchView from "./views/searchView.js";
import resultsView from "./views/resultsView.js";
import { isWebAssemblyCompiledModule } from "util/support/types.js";

if (module.hot) {
  module.hot.accept();
}

// ~~●~~●~~●~~●~~●~~●~~●~~●~~●~~●~~●~~●~~●~~●~~●~~●~~●~~●~~

const controllRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;

    recipeView.spinner();

    // 1) Loading Recipe ~~●~~●~~●~~●~~●~~●~~●~~●~~●~~●~~●~~●~~●~~●~~●~~●~~●~~●~~
    await model.loadRecipe(id);

    // 2) Rendering Recipe ~~●~~●~~●~~●~~●~~●~~●~~●~~●~~●~~●~~●~~●~~●~~●~~●~~●~~●~~
    recipeView.render(model.state.recipe);
  } catch (error) {
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    const query = searchView.getQuery();
    if (!query) return;

    resultsView.spinner();

    await model.loadSearchRecipe(query);

    resultsView.render(model.state.search.results);
  } catch (error) {
    console.log(`${error} ***`);
    recipeView.renderError();
  }
};
controlSearchResults();

const init = function () {
  recipeView.addHandlerRender(controllRecipes);
  searchView.addHandlerSearch(controlSearchResults);
};

init();
