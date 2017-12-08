Rails.application.routes.draw do
  
  root 'recipes#index'

  devise_for :users, :controllers => { registrations: 'registrations', omniauth_callbacks: "users/omniauth_callbacks" }
  
  resources :recipes do
    resources :ingredients
    resources :comments
  end

  get 'all', to: 'recipes#index', as: 'all_recipes'
end
