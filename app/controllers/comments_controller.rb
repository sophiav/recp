class CommentsController < ApplicationController
  def new
    @comment = Comment.new
  end

  def create
    @comment = Comment.new(comment_params)
    if @comment.save
      redirect_to recipe_path(params[:recipe_id])
    else
      render :new
    end
  end

  def edit
  end

  def update
  end

  def destroy
  end

  private

  def comment_params
    params.require(:comment).permit(:message)
  end

  def set_comment
    @comment = Recipe.find_by(id: params[:recipe_id]).comments.find_by(id: params[:id])
    # @comment = Comment.find_by(recipe_id: params[:recipe_id], id: params[:id])
  end
end