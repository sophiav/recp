class Recipe < ApplicationRecord
  belongs_to :user
  has_many :ingredients, dependent: :destroy
  has_many :comments, dependent: :destroy
  has_many :commentators, through: :comments, class_name: 'User'

  validates :title, :description, :category, presence: true
  validates :title, length: { in: 1..30 }

  accepts_nested_attributes_for :ingredients, allow_destroy: true, reject_if: proc { |attributes| attributes['name'].blank? }

  has_attached_file :image, styles: { medium: "300x300#", large: "500x500#"  }, default_url: "/images/:style/missing.png"
  validates_attachment_content_type :image, content_type: /\Aimage\/.*\z/

  def self.most_recently_updated
    order('updated_at DESC').limit(30)
  end

  def most_recent_comments
    comments.limit(3)
  end
end
