class UsersController < ApplicationController
    before_action :authorized, only: [:auto_login]

    # REGISTER
    def create
        @user = User.create(user_params)
        if @user.valid?
            token = encode_token({ user_id: @user.id })
            render json: { user: @user, token: token }
        else
            render json: { error: "Invalid username or password" }
        end
    end

    # LOGGING IN
    def login
        @user = User.find_by(email: params[:email])

        if @user && @user.authenticate(params[:password])
            token = encode_token({ user_id: @user.id })
            render json: { username: @user.get_username, email: @user.get_email, token: token }
        else
            render json: { error: "Invalid username or password" }
        end
    end

    def get_history
        @user = current_user

        render json: { history: @user.get_history_list }
    end

    def auto_login
        render json: @user
    end

    private

    def user_params
        params.permit(:username, :email, :password, :items_scanned)
    end
  end
