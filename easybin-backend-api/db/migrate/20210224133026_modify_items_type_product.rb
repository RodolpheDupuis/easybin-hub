class ModifyItemsTypeProduct < ActiveRecord::Migration[6.1]
  def change
    change_column :products, :items, :jsonb, :null => false, :default => {}
    add_index  :products, :items, using: :gin
  end
end
