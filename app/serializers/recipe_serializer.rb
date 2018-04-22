class RecipeSerializer < ActiveModel::Serializer
  attributes  :id, :title, :description, :image,
              :prep_time, :categories, :ingredients,
              :next, :previous

  def image
    { medium: object.image.url(:medium), large: object.image.url(:large), original: object.image }
  end
end
