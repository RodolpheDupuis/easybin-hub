class AddColumnToProducts < ActiveRecord::Migration[6.1]
  def change
    add_column :products, :items, :json, :null => false, default: {}
    #Ex:- :null => false
    #Ex:- add_column("admin_users", "username", :string, :limit =>25, :after => "email")
  end
end
