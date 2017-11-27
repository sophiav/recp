class ChangeQuantityToBeStringInIngredients < ActiveRecord::Migration[5.1]
  def change
    change_column :ingredients, :quantity, :string
  end
end
