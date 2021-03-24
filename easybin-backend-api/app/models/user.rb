class User < ApplicationRecord
    has_secure_password
    attribute :items_scanned, default: []

    def get_username
        return username
    end

    def get_email
        return email
    end

    def get_history_list
        return items_scanned
    end

end
