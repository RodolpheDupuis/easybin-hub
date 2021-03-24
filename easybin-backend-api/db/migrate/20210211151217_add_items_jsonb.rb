class AddItemsJsonb < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :items_scanned, :jsonb, null: false, default: {}
    #Ex:- add_column("admin_users", "username", :string, :limit =>25, :after => "email")
  end
end
