class AddItemsFieldProducts < ActiveRecord::Migration[6.1]
  def change
    add_column :products, :items, :jsonb, :default => []
    #Ex:- :default =>''
    #Ex:- add_column("admin_users", "username", :string, :limit =>25, :after => "email")
  end
end
