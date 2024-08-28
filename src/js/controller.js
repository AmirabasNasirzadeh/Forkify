import * as model from "./model.js";
import recipeView from "./views/recipeView.js";
import "core-js/stable";
import "regenerator-runtime/runtime";
import searchView from "./views/searchView.js";
import resultsView from "./views/resultsView.js";
import paginationView from "./views/paginationView.js";
import bookmarksView from "./views/bookmarksView.js";
import { isWebAssemblyCompiledModule } from "util/support/types.js";
import View from "./views/view.js";

if (module.hot) {
  module.hot.accept();
}

// ~~●~~●~~●~~●~~●~~●~~●~~●~~●~~●~~●~~●~~●~~●~~●~~●~~●~~●~~

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;

    recipeView.spinner();

    // 1) Update results to mark selected search result ~~●~~●~~●~~●~~●~~●~~●~~●~~
    resultsView.update(model.getSearchResultPages());
    bookmarksView.update(model.state.bookmarks);

    // 2) Loading Recipe ~~●~~●~~●~~●~~●~~●~~●~~●~~●~~●~~●~~●~~●~~●~~●~~●~~●~~●~~
    await model.loadRecipe(id);
    // 3) Rendering Recipe ~~●~~●~~●~~●~~●~~●~~●~~●~~●~~●~~●~~●~~●~~●~~●~~●~~●~~●~~
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
    resultsView.render(model.getSearchResultPages());

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

  // 2) Update the recipe view
  recipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
  // 1) ADD/Remove the bookmark
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);

  // 2) Update the recipeView
  recipeView.update(model.state.recipe);

  // 3) Update the bookmarksView
  bookmarksView.render(model.state.bookmarks);
};

const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerPagination(controlpagination);
  bookmarksView.addHandlerRender(controlBookmarks);
};

init();
