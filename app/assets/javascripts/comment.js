class Comment {
  constructor(id, attributes) {
    this.id = id;
    this.message = attributes.message;
    this.authorName = attributes['author-name'];
    // remove the timezone 'Z' from string
    this.updatedAt = attributes['updated-at'].slice(0, -1);
    this.isOwner = attributes['is-owner'];
    this.recipeId = attributes['recipe-id'];
  }
}

Comment.prototype.renderEditControls = function() {
  if(this.isOwner) {
    return `
      <span class="comment-options">
        <a href="/recipes/${this.recipeId}/comments/${this.id}/edit">Edit</a> |
        <a
          data-confirm="Are you sure you want to delete this comment?"
          data-method="delete"
          href="/recipes/${this.recipeId}/comments/${this.id}">Delete
        </a>
      </span>
    `
  }

  return '';
}

Comment.prototype.render = function() {
  // convert the date to the right format
  const updatedAt = strftime("%e %B %Y %H:%M %p", new Date(this.updatedAt));

  return `
    <li>
      <div class="card">
        <div class="card-header">
          <small><strong>${this.authorName}</strong> - ${updatedAt}</small>
        </div>
        <div class="card-body">
          <p>
           ${this.message}
           ${this.renderEditControls()}
         </p>
       </div>
     </div>
    </li>
  `
}

// Method on the Class to help with rendering many comments
// Used in Recipe object to render all its comments
Comment.renderAll = function(comments) {
  const allComments = comments.map(comment => {
    return comment.render();
  }).join('');

  return `
    <ul id="comments" class="list-unstyled">
      ${allComments}
    </ul>
  `
}
