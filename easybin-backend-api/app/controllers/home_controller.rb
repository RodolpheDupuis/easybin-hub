class HomeController < ApplicationController
    skip_before_action :authorized

    def index
        render(body: "Here is a private area 🤫") && return
    end
end