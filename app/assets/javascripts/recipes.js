class Recipe {
  constructor(id, attributes, comments = []) {
    this.id = id;
    this.title = attributes.title;
    this.image = attributes.image;
    this.description = attributes.description;
    this.prepTime = attributes['prep-time'];
    this.categories = attributes.categories;
    this.ingredients = attributes.ingredients;
    this.next = attributes.next;
    this.previous = attributes.previous;
    this.isOwner = attributes['is-owner'];

    this.comments = comments;
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

  renderCategories() {
    return this.categories.map((category, index) => {
      let categoryHTML = `<span>${category.name.toLowerCase()}</span>`;

      if(index < this.categories.length - 1) {
        categoryHTML += '<span> | </span>';
      }
      return categoryHTML;
    }).join('');
  }

  renderIngredients() {
    return this.ingredients.map(ingredient => {
      return `
        <tr>
          <td class="ingredient-quantity">${ingredient.quantity}</td>
          <td>${ingredient.name}</td>
        </tr>
      `
    }).join('');
  }

  renderPreviousAndNextLinks() {
    const previous = this.previous
      ? `<a href="#" data-id="${this.previous}" class="previous-link">Previous</a>`
      : '';

    const next = this.next
      ? `<a href="#" data-id="${this.next}" class="next-link">Next</a>`
      : '';

    return `
      <div class="next-previous-links">
        ${previous}
        ${next}
      </div>
    `
  }

  renderOwnerControls() {
    if(this.isOwner) {
      return `
        <div class="btn-group" role="group">
          <div class="form-buttons">
            <a href="/recipes/${this.id}/edit" class='btn btn-outline-primary btn-sm'>Edit Recipe</a>
            <a
              data-confirm="Are you sure you want to delete this recipe?"
              data-method="delete"
              href="/recipes/${this.id}" class="btn btn-outline-danger btn-sm"
              >
              Delete Recipe
            </a>
          </div>
        </div>
      `
    }
    return '';
  }

  renderNewCommentForm() {
    return `
      <form class="new_comment" id="new_comment" action="/recipes/${this.id}/comments" accept-charset="UTF-8" method="post">
        <input name="utf8" type="hidden" value="✓">
        <input type="hidden" name="authenticity_token" value="${Rails.csrfToken()}">
        <div class="form-group">
          <textarea placeholder="Type in your comment..." class="form-control" name="comment[message]" id="comment_message"></textarea>
        </div>

        <div class="form-buttons">
          <input type="submit" name="commit" value="Create Comment" class="btn btn-primary" data-disable-with="Create Comment">
        </div>
      </form>
    `
  }

  renderComments() {
    return `
      ${this.renderNewCommentForm()}
      ${Comment.renderAll(this.comments)}
    `
  }

  render() {
    return `
      <h1 class="recipe-title text-center">
        ${this.title}
      </h1>

      <h4 class="recipe-details text-center">
        <small class="text-muted">
          ${this.renderCategories()}
        </small>
        <small>${this.prepTime} minutes</small>
      </h4>


      <img src='${this.image.large}' class='recipe-image img-fluid rounded mx-auto d-block' />


      <div class="recipe-smaller-box">
        <div class="recipe-ingredients">
          <h3>Ingredients</h3>
          <table>
            <tbody>
              ${this.renderIngredients()}
            </tbody>
          </table>
        </div>

        <div class="recipe-instructions">
          <h3>Instructions</h3>
          <p class="text-justify">${this.description}</p>

          ${this.renderOwnerControls()}
        </div>

        ${this.renderPreviousAndNextLinks()}
      </div>

      <div class="recipe-comments">
        <h3>Comments</h3>
        ${this.renderComments()}
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
