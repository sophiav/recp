class AddRecipeIdToIngredients < ActiveRecord::Migration[5.1]
  def change
    add_column :ingredients, :recipe, :string
  end
end
