# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20130601163337) do

  create_table "groups", :force => true do |t|
    t.date     "date_of_hike"
    t.integer  "no_of_hikers"
    t.boolean  "kids"
    t.float    "hours_of_hiking"
    t.float    "latitude"
    t.float    "longitude"
    t.datetime "created_at",      :null => false
    t.datetime "updated_at",      :null => false
  end

  create_table "trails", :force => true do |t|
    t.string   "name"
    t.float    "distance"
    t.float    "min_time"
    t.float    "max_time"
    t.float    "latitude"
    t.float    "elevation"
    t.text     "description"
    t.datetime "created_at",  :null => false
    t.datetime "updated_at",  :null => false
  end

  create_table "users", :force => true do |t|
    t.string   "email"
    t.string   "hashed_pass"
    t.integer  "age"
    t.datetime "created_at",  :null => false
    t.datetime "updated_at",  :null => false
  end

end
