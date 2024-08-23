import * as model from "./model.js";
import recipeView from "./views/recipeView.js";
import "core-js/stable";
import "regenerator-runtime/runtime";
import searchView from "./views/searchView.js";
import resultsView from "./views/resultsView.js";
import paginationView from "./views/paginationView.js";
import { isWebAssemblyCompiledModule } from "util/support/types.js";

if (module.hot) {
  module.hot.accept();
}

// ~~●~~●~~●~~●~~●~~●~~●~~●~~●~~●~~●~~●~~●~~●~~●~~●~~●~~●~~

const controlRecipes = async function () {
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
    // 1) Get search query ~~●~~●~~●~~●~~●~~●~~●~~●~~●~~●~~●~~●~~●~~●~~●~~●~~●~~●~~
    const query = searchView.getQuery();
    if (!query) return;

    resultsView.spinner();

    // 2) Loading search results ~~●~~●~~●~~●~~●~~●~~●~~●~~●~~●~~●~~●~~●~~●~~●~~●~~●~~●~~
    await model.loadSearchRecipe(query);

    // 3) Render results ~~●~~●~~●~~●~~●~~●~~●~~●~~●~~●~~●~~●~~●~~●~~●~~●~~●~~●~~
    resultsView.render(model.getSearchResultPages(1));

    // 3) Render pagination ~~●~~●~~●~~●~~●~~●~~●~~●~~●~~●~~●~~●~~●~~●~~●~~●~~●~~●~~
    paginationView.render(model.state.search);
  } catch (error) {
    console.log(`${error} ***`);
    resultsView.renderError();
  }
};

const controlpagination = function (goToPage) {
  // 1) Render NEW results ~~●~~●~~●~~●~~●~~●~~●~~●~~●~~●~~●~~●~~●~~●~~●~~●~~●~~●~~
  resultsView.render(model.getSearchResultPages(goToPage));

  // 2) Render NEW pagination ~~●~~●~~●~~●~~●~~●~~●~~●~~●~~●~~●~~●~~●~~●~~●~~●~~●~~●~~
  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  // 1) Update the recipe servings
  model.updateServings(newServings);

  // 1) Update the recipe view
  recipeView.render(model.state.recipe);
};

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerPagination(controlpagination);
};

init();
