class AddIndexUsersDefault < ActiveRecord::Migration[6.1]
  def change
    change_column :users, :items_scanned, :jsonb, :null => false, :default => {}
  end
end
