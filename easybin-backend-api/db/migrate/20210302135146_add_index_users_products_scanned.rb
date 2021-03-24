class AddIndexUsersProductsScanned < ActiveRecord::Migration[6.1]
  def change
    add_index  :users, :items_scanned, using: :gin
  end
end
