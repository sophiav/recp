Rails.application.routes.draw do
  devise_for :users, :controllers => { :omniauth_callbacks => "users/omniauth_callbacks" }
  
  root 'recipes#index'

  resources :recipes do
    resources :ingredients
  end
end
