class Recipe < ApplicationRecord
  belongs_to :user, optional: true
  has_many :ingredients
  has_many :comments
  has_many :commenters, class_name: 'User', through: :comments

  validates :title, :description, :category, presence: true
  validates :title, length: { in: 1..30 }

  accepts_nested_attributes_for :ingredients, allow_destroy: true, reject_if: proc { |attributes| attributes['name'].blank? }
  # validates_associated :ingredients
end
