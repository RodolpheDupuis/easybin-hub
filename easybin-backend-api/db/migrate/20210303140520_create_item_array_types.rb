class CreateItemArrayTypes < ActiveRecord::Migration[6.1]
  def change
    create_table :item_array_types do |t|

      t.timestamps
    end
  end
end
