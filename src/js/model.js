// business logic, state, http library
//  state object to store the recipes
//ajax calls to the server

export const state = {
  recipe: {},
};

//1. loading the recipe
//fetch request to the api, response object back

export const loadRecipe = async function (id) {
  try {
    const res = await fetch(
      // 'https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886'
      `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`
    );
    //convert to JSON
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} ${res.status}`);

    //Format the data -> create new object
    const { recipe } = data.data;
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };

    console.log(state.recipe);
  } catch (error) {
    alert(error);
  }
};
