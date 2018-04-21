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

Recipe.renderMostRecentlyUpdated = function() {
  const allRecipes = Recipe.mostRecentlyUpdated();

  allRecipes.done((response) => {
    const recipes = response.data.map(recipe => {
      return new Recipe(recipe.id, recipe.attributes).renderForIndex();
    });

    $('#recipes').append(recipes);
  });
}

Recipe.mostRecentlyUpdated = function() {
  return $.get('/recipes');
}
