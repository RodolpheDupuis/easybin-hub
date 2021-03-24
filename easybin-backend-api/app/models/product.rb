class Product < ApplicationRecord
    attribute :items_scanned, default: []

    def get_name
        return name
    end

    def get_barcode
        return barcode
    end

    def get_items
        return items
    end
end
