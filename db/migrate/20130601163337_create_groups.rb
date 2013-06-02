class CreateGroups < ActiveRecord::Migration
  def change
    create_table :groups do |t|
      t.date :date_of_hike
      t.integer :no_of_hikers
      t.boolean :kids
      t.float :hours_of_hiking
      t.float :latitude
      t.float :longitude

      t.timestamps
    end
  end
end
