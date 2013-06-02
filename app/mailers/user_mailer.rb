class UserMailer < ActionMailer::Base
  default from: "itinerary@getout.com"
  
  def itinerary_email(email, tname, dist, dif, time)
    @email = email
    @tname = tname
    @dist = dist
    @dif = dif
    @time = time
    
    mail(:to => email, :subject => "Have Fun on Your Hike!")
  end
end
