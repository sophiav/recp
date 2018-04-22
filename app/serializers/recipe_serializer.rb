class RecipeSerializer < ActiveModel::Serializer
  attributes  :id, :title, :description, :image,
              :prep_time, :categories, :ingredients,
              :next, :previous, :is_owner

  def is_owner
    current_user && object.user_id == current_user.id
  end

  def image
    { medium: object.image.url(:medium), large: object.image.url(:large), original: object.image }
  end
end
