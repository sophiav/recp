Rails.application.routes.draw do
  
  root 'recipes#index'

  devise_for :users, :controllers => { :omniauth_callbacks => "users/omniauth_callbacks" }

  resources :recipes do
    resources :ingredients
    resources :comments
  end


end
