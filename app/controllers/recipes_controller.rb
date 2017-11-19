class RecipesController < ApplicationController
  before_action :set_recipe, only: [:show, :edit, :update]
  
  def index
    @recipes = Recipe.all
  end

  def show
    @recipe = Recipe.find(params[:id])
  end

  def new
    @recipe = Recipe.new
  end

  def create
    recipe = Recipe.new(recipe_params)
    if recipe.save
      redirect_to @recipe
    else
      render :new
    end
  end

  def edit
  end

  def update
    @recipe = Recipe.create(recipe_params)

    if @recipe
      redirect_to @recipe
    else
      render :edit
    end
  end

  private

    def recipe_params
      params.require(:recipe).permit(:title, :category, :description, :prep_time)
    end

    def set_recipe
      @recipe = Recipe.find(params[:id])
    end
end
