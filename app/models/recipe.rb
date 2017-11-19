class Recipe < ApplicationRecord
  has_many :ingredients
  accepts_nested_attributes_for :ingredients, allow_destroy: true, reject_if: proc { |attributes| attributes['name'].blank? }
end
