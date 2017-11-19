class CreateRecipes < ActiveRecord::Migration[5.1]
  def change
    create_table :recipes do |t|
      t.string :title
      t.string :category
      t.text :description
      t.integer :prep_time
      t.binary :image

      t.timestamps
    end
  end
end
