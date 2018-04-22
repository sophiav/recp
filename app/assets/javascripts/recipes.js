class Recipe {
  constructor(id, attributes) {
    this.id = id;
    this.title = attributes.title;
    this.image = attributes.image;
    this.description = attributes.description;
    this.prepTime = attributes['prep-time'];
    this.categories = attributes.categories;
    this.ingredients = attributes.ingredients;
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

  render() {
    // <div class="btn-group" role="group">
    //   <div class="form-buttons">
    //     <% if owner?(@recipe) %>
    //       <%= link_to "Edit Recipe", edit_recipe_path(@recipe), class: 'btn btn-outline-primary btn-sm'%>
    //       <%= link_to "Delete Recipe", @recipe, method: :delete, data: { confirm: "Are you sure you want to delete this recipe?"}, class: 'btn btn-outline-danger btn-sm' %>
    //     <% end %>
    //   </div>
    // </div>

    return `
      <h1 class="recipe-title text-center">
        ${this.title}
      </h1>

      <h4 class="recipe-details text-center">
        <small class="text-muted">
          ${this.categories.map((category, index) => {
            let categoryHTML = `<span>${category.name.toLowerCase()}</span>`;

            if(index < this.categories.length - 1) {
              categoryHTML += '<span> | </span>';
            }
            return categoryHTML;
          })}
        </small>
        <small>${this.prepTime} minutes</small>
      </h4>


      <img src='${this.image.large}' class: 'recipe-image img-fluid rounded mx-auto d-block' />


      <div class="recipe-smaller-box">
        <div class="recipe-ingredients">
          <h3>Ingredients</h3>
          <table>
            <tbody>
              ${this.ingredients.map(ingredient => {
                return `<tr>
                  <td class="ingredient-quantity">${ingredient.quantity}</td>
                  <td>${ingredient.name}</td>
                </tr>
                `
              })}
            </tbody>
          </table>
        </div>

        <div class="recipe-instructions">
          <h3>Instructions</h3>
          <p class="text-justify">${this.description}</p>

          // render the edit/delete links
        </div>

        <div class="next-previous-links">
          <a href="#" data-id="20" class="previous-link">Previous</a>
          <a href="#" class="next-link">Next</a>
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
