const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

console.log(`Test`);

const showRecipe = async function () {
  try {
    //fetch request to the api, response object back
    const res = await fetch(
      // 'https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886'
      'https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bcb37'
    );
    //convert to JSON
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} ${res.status}`);

    //Format the data -> create new object
    let { recipe } = data.data;
    recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };
    console.log(recipe);

    console.log(res, data);
  } catch (err) {
    console.error(err);
  }
};

showRecipe();
