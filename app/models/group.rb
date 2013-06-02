class Group < ActiveRecord::Base
  attr_accessible :date_of_hike, :hours_of_hiking, :kids, :latitude, :longitude, :no_of_hikers
  belongs_to :user
end
