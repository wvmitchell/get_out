class GroupsController < ApplicationController
  def index
  end
  
  def send_email
    email = params[:email]
    tname = params[:tname]
    dist = params[:dist]
    dif = params[:dif]
    time = params[:time]
    
    UserMailer.itinerary_email(email,tname,dist,dif,time).deliver
    
    render :nothing => true
  end
  
  def hike_array
    @trails = Everytrail.new
    latitude = params[:lat]
    longitude = params[:lng]
    min_time = params[:time]
    
    response = @trails.find_trails(latitude, longitude, min_time, 10)
    
    data = response.parsed_response
    
    trips = data['etTripSearchResponse']['trips']['trip']
    
    trip_names = trips.collect do |trip|
      nm = trip['name']
      lat = trip['location']['lat']
      lon = trip['location']['lon']
      desc = trip['description']
      dist = trip['length']['__content__']
      [nm,lat,lon,desc,dist];
    end
    
    render :text => trip_names
  end
end
