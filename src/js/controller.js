import * as model from './model';
import recipeView from './views/recipeView';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

const recipeContainer = document.querySelector('.recipe');

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

console.log(`Test`);

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    console.log(id);

    if (!id) return;
    recipeView.renderSpinner();

    //1) Loading recipe
    await model.loadRecipe(id);

    //2) Rendering recipe
    recipeView.render(model.state.recipe);

    // console.log(res, data);
  } catch (err) {
    recipeView.renderError();

    //handle the error thrown by the model, update the view
    //so we need a method in recipeView where we can display the error
  }
};

const controlSearchResults = async function () {
  try {
    await model.loadSearchResults('pizza');
    console.log(model.state.search.results);
  } catch (err) {
    console.log(err);
  }
};

controlSearchResults();

const init = function () {
  //attach controlRecipes to the event handlers
  recipeView.addHandlerRender(controlRecipes);
};

init();
