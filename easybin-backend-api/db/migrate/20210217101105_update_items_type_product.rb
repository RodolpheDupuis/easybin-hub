class UpdateItemsTypeProduct < ActiveRecord::Migration[6.1]
  def change
    remove_column :products, :items
    # change_column :products, :items, :json, :null => false, default: {}
    #Ex:- :null => false, default: {}
    #Ex:- change_column("admin_users", "email", :string, :limit =>25)
  end
end
