class ProductsController < ApplicationController
    before_action :authorized

    # GET PRODUCT INFORMATION AND SEND IT TO THE FRONT
    def show
        @product = Product.find_by(barcode: params[:barcode])
        user = current_user

        if @product.nil?
            render json: { message: "Product does not exist" }
            return
        end

        user.items_scanned.each_with_index do |item, index|
            if item["name"] == @product.get_name and user.items_scanned.count == 1
                user.items_scanned.clear
            end
            if item["name"] == @product.get_name
                puts "DELETE AND PUSH #{index}"
                user.items_scanned.delete_at(index)
            end
        end
        puts user.items_scanned.count
        user.items_scanned.push({ name: @product.get_name, barcode: @product.get_barcode, items: @product.get_items })
        user.save!
        render json: { name: @product.get_name, barcode: @product.get_barcode, items: @product.get_items }
    end

    # ADD PRODUCT IN DB WITH ALL ITS COMPONENTS AND INFORMATION
    def add
        @product = Product.create!(product_params)
        @product.items.push(params[:items])
        @product.save!
        if @product.valid?
            render json: { message: "Product successfully added !", items: @product.get_items }
        else
            render json: { error: "Missing product parameters (name, barcode, items)" }
        end
    end

    private

    def product_params
        params.permit(:name, :barcode, :items)
    end
end