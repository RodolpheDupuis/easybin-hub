class AddFieldsToUsers < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :items_scanned, :json
  end
end
