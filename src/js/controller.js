import * as model from "./model.js";
import recipeView from "./views/recipeView.js";
import icons from "url:../img/icons.svg";
import "core-js/stable";
import "regenerator-runtime/runtime";

const recipeContainer = document.querySelector(".recipe");

// ~~●~~●~~●~~●~~●~~●~~●~~●~~●~~●~~●~~●~~●~~●~~●~~●~~●~~●~~

const controllRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;

    recipeView.spinner(recipeContainer);

    // 1) Loading Recipe ~~●~~●~~●~~●~~●~~●~~●~~●~~●~~●~~●~~●~~●~~●~~●~~●~~●~~●~~
    await model.loadRecipe(id);

    // 2) Rendering Recipe ~~●~~●~~●~~●~~●~~●~~●~~●~~●~~●~~●~~●~~●~~●~~●~~●~~●~~●~~
    recipeView.render(model.state.recipe);
  } catch (error) {
    alert(error);
  }
};

[`load`, `hashchange`].forEach((event) => window.addEventListener(event, controllRecipes));
