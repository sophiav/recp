# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

recipe1 = Recipe.create(title: "Beet Root Salad", category: 'salads', description: "Chop garden greens of your choice, add beetroot, lemon and olive oil and season with salt and pepper", prep_time: 5, image: nil)


ingredient1 = Ingredient.create(name: "Beetroot", quantity: 2)
ingredient2 = Ingredient.create(name: 'Kale', quantity: 1)
