class RecipesController < ApplicationController
  before_action :authenticate_user!, except: [:index, :show]
  before_action :set_recipe, only: [:show, :edit, :update, :destroy]
  before_action only: [:edit, :update, :destroy] { authorize_user!(@recipe) }

  def index
    if request.path == '/all'
      @recipes = Recipe.most_recently_updated
    else
      @recipes = Recipe.most_recently_updated.limit(9)
    end

    render json: @recipes
  end

  def show
    @comment = Comment.new
    @comments = @recipe.comments

    respond_to do |format|
      format.json { render json: @recipe, include: ['comments'] }
      format.html
    end
  end

  def new
    @recipe = Recipe.new
    @categories = Category.all
    @recipe.ingredients.build
    @new_category = @recipe.categories.build
  end

  def create
    @recipe = Recipe.new(recipe_params)
    @recipe.user_id = current_user.id

    if @recipe.save
      flash[:notice] = 'Successfully created recipe'
      redirect_to @recipe
    else
      @recipe.ingredients.build
      render :new
    end
  end

  def edit
    @categories = Category.all
    @new_category = @recipe.categories.build
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
