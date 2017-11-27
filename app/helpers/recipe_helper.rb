module RecipeHelper
  def display_recipe_categories(categories)
    content_tag :div do
      categories.map.with_index do |category, index|
        # we need concat to join/concatenate each content_tag into one string
        concat(content_tag(:span, category.name.downcase))

        # if there are more categories then add a ' | ' after each one
        concat(content_tag(:span, " | ")) if index < categories.size - 1
      end
    end
  end
end
