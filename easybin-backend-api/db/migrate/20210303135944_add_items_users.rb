class AddItemsUsers < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :items_scanned, :jsonb, :default => []
    #Ex:- :default =>''
    #Ex:- add_column("admin_users", "username", :string, :limit =>25, :after => "email")
  end
end
