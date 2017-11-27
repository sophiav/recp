class RemoveCategoryAttributeFromRecipes < ActiveRecord::Migration[5.1]
  def change
    remove_column :recipes, :category, :string
  end
end
