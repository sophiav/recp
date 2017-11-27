class RecipesController < ApplicationController
  before_action :authenticate_user!, except: [:index, :show]
  before_action :set_recipe, only: [:show, :edit, :update, :destroy]
  before_action only: [:edit, :update, :destroy] { authorize_user!(@recipe) }
  
  def index
    @recipes = Recipe.most_recently_updated
  end

  def show
    @comment = Comment.new
    @comments = @recipe.most_recent_comments
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
        :image,
        ingredients_attributes: [:id, :name, :quantity, :_destroy],
        category_ids: [],
        categories_attributes: [:name]
        )

    end

    def set_recipe
      @recipe = Recipe.find(params[:id])
    end
end
