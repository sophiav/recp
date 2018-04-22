// Takes an array and splits it into a new array of threes
function sliceInThrees(arr) {
  let slicedArray = [];

  while(arr.length) { // stop when there are no more items in arr
    const result = arr.splice(0, 3); // every slice is 3
    slicedArray.push(result); // add the result to the new array
  }

  return slicedArray;
}

function attachShowPageListeners() {
  $('.next-previous-links a').on('click', function(e) {
    e.preventDefault();
    // the id must be the id for the previous recipe which we can grab from the link
    // get the results and replace the content on the page
    const id = $(this).data('id');
    $.get(`/recipes/${id}`).done(function(responseJSON) {
      const id = responseJSON.data.id;
      const attributes = responseJSON.data.attributes;
      const relationships = responseJSON.data.relationships;

      // loop through all the included comments and create a new Comment object
      let comments = [];
      responseJSON.included.map(item => {
        const comment = new Comment(item.id, item.attributes, id);
        comments.push(comment);
      });

      const recipe = new Recipe(id, attributes, comments);
      const recipeHTML = recipe.render();

      $('#recipe').html(recipeHTML);

      console.log(responseJSON);
      attachShowPageListeners();
    })
  });
}
