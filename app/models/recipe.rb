class Recipe < ApplicationRecord
  has_many :ingredients
  validates :title, :description, :category, presence: true
  validates :title, length: { in: 1..30 }

  accepts_nested_attributes_for :ingredients, allow_destroy: true, reject_if: proc { |attributes| attributes['name'].blank? }

end
