class ChangeItemsToBeJsonb < ActiveRecord::Migration[6.1]
  def change
    change_column :users, :items_scanned, :jsonb
    #Ex:- change_column("admin_users", "email", :string, :limit =>25)
  end
end
