class Ingredient < ApplicationRecord
  belongs_to :recipe
  validates :name, presence: true
  validates :quantity, numericality: { only_integer: true }
end
