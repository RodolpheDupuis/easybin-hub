Rails.application.routes.draw do
    root to: "home#index"

    resource :users, only: [:create]
    post "/login", to: "users#login"
    get "/history", to: "users#get_history"

    get '/products/infos/:barcode', param: :barcode, to: 'products#show', as: 'product'
    resources :products do
        post 'add', on: :collection
        # get 'infos/:id', to: 'products#show', as: 'product'
    end
    # get "/auto_login", to: "users#auto_login"
end
