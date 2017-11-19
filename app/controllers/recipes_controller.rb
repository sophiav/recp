class RecipesController < ApplicationController
  before_action :set_recipe, only: [:show, :edit, :update]
  
  def index
    @recipes = Recipe.all
  end

  def show
    @recipe = Recipe.find(params[:id])
  end

  private

    def set_recipe
      @recipe = Recipe.find(params[:id])
    end
end
