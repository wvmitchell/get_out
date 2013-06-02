class User < ActiveRecord::Base
  attr_accessible :age, :email, :hashed_pass
  has_many :groups
end
