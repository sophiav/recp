class Recipe < ApplicationRecord
  belongs_to :user
  has_many :ingredients, dependent: :destroy

  has_many :comments, dependent: :destroy
  has_many :commentators, through: :comments, source: :user

  has_many :recipe_categories, dependent: :destroy
  has_many :categories, through: :recipe_categories

  validates :title, :description, :image, presence: true
  validates :title, length: { in: 1..30 }

  accepts_nested_attributes_for :ingredients, allow_destroy: true, reject_if: proc { |attributes| attributes['name'].blank? }

  has_attached_file :image, styles: { medium: "300x300#", large: "500x500#"  }, default_url: "/images/:style/missing.png"
  validates_attachment_content_type :image, content_type: /\Aimage\/.*\z/

  def categories_attributes=(category_attributes)
    category_attributes.values.each do |category_attribute|
      if !category_attribute['name'].blank?
        category = Category.find_or_create_by(category_attribute)
        self.categories << category
      end
    end
  end

  def self.most_recently_updated
    order('updated_at DESC')
  end

  def most_recent_comments
    comments.limit(3)
  end

  def next
    value = self.class.order(:id).where("id > ?", id).first
    value ? value.id : nil
  end

  def previous
    value = self.class.order(:id).where("id < ?", id).last
    value ? value.id : nil
  end

end
