class CommentSerializer < ActiveModel::Serializer
  attributes :id, :author_name, :updated_at, :message, :is_owner

  def author_name
    object.user.name.to_s
  end

  def is_owner
    current_user && object.user_id == current_user.id
  end
end
