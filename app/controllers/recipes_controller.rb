class RecipesController < ApplicationController
  before_action :set_recipe, only: [:show, :edit, :update, :destroy]
  before_action :authenticate_user!, except: [:index, :show]
  
  def index
    @recipes = Recipe.all
  end

  def show
    @comment = Comment.new
  end

  def new
    @recipe = Recipe.new
    @recipe.ingredients.build
  end

  def create
    @recipe = Recipe.new(recipe_params)
    @recipe.user_id = current_user.id

    if @recipe.save
      flash[:notice] = 'Successfully created recipe'
      redirect_to @recipe
    else
      # because we reject_if empty and we still want to show something to the user
      @recipe.ingredients.build
      render :new
    end
  end

  def edit
  end

  def update
    if @recipe.update(recipe_params)
      redirect_to @recipe
    else
      render :edit
    end
  end

  def destroy
    @recipe.destroy
    redirect_to root_path, notice: "Successfully destroyed that recipe"
  end

  private

    def recipe_params
      params.require(:recipe).permit(
        :title, 
        :category, 
        :description, 
        :prep_time,
        ingredients_attributes: [:id, :name, :quantity, :_destroy]
        )
    end

    def set_recipe
      @recipe = Recipe.find(params[:id])
    end
end
