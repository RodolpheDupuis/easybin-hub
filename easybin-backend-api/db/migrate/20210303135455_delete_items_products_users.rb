class DeleteItemsProductsUsers < ActiveRecord::Migration[6.1]
  def change
    remove_column :products, :items
    remove_column :users, :items_scanned
  end
end
