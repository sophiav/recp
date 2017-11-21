class CommentsController < ApplicationController
  before_action :set_comment, only: [:edit, :update, :destroy]
  def new
    @comment = Comment.new
  end

  def create
    recipe = Recipe.find_by(id: params[:recipe_id])
    @comment = recipe.comments.create(user_id: current_user.id, message: comment_params[:message])

    if @comment
      flash[:notice] = "Comment added"
    else
      flash[:alert] = "Cannot submit an empty comment"
    end
    redirect_to recipe
  end

  def edit
  end

  def update
    if @comment.update(comment_params)
      flash[:notice] = "Comment updated"
      redirect_to @recipe
    else
      flash[:alert] = "Cannot submit an empty comment"
      render :edit
    end
  end

  def destroy
    @comment.destroy
    redirect_to @recipe
  end

  private

  def comment_params
    params.require(:comment).permit(:message)
  end

  def set_comment
    @recipe = Recipe.find_by(id: params[:recipe_id])
    @comment = @recipe.comments.find_by(id: params[:id])
  end
end