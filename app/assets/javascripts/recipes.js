class Recipe {
  constructor(id, attributes) {
    this.id = id;
    this.title = attributes.title;
    this.image = attributes.image;
    this.description = attributes.description;
  }

  renderForIndex() {
    return `
      <div class='col-lg'>
        <div class='recipe-box'>
          <a href="/recipes/${this.id}">
            <div class='recipe-box-title'>
              <p>${this.title}</p>
            </div>
            <div class='recipe-box-image-wrapper'>
              <img src='${this.image.medium}' class='recipe-box-image rounded' />
            </div>
          </a>
        </div>
      </div>
    `
  }
}

Recipe.renderAll = function() {
  const allRecipes = Recipe.getAllRecipes();
  Recipe.renderRecipes(allRecipes);
}

Recipe.renderMostRecentlyUpdated = function() {
  const mostRecent = Recipe.getMostRecentRecipes();
  Recipe.renderRecipes(mostRecent);
}

Recipe.getMostRecentRecipes = function() {
  return $.get('/recipes');
}

Recipe.getAllRecipes = function() {
  return $.get('/all');
}

Recipe.renderRecipes = function(recipeResponse) {
  recipeResponse.done((responseJSON) => {
    const recipesInThrees = sliceInThrees(responseJSON.data);

    const recipesInRows = recipesInThrees.map(recipes => {
      // i.e. recipes = [ {id:1} , {id:2} , {id:3} ]
      const recipesHTML = recipes.map(recipe => {
        // create new Recipe object and get the html for it
        return new Recipe(recipe.id, recipe.attributes).renderForIndex();
      });

      // render the <=3 recipes inside a row
      return `
        <div class="row">
          ${recipesHTML}
        </div>
      `
    });

    $('#recipes').html(recipesInRows);
  });
}
