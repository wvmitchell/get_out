class Everytrail
  include HTTParty
  base_uri 'www.everytrail.com/api'
  
  def initialize
    u = "556cac2fbcb148a590e0369e3285fb1a"
    p = "8697c388ac344f5a"
    @auth = {:username => u, :password => p}
  end
  
  def find_trails(lat, lon, min_time, limit)
    options = {:basic_auth => @auth}
    self.class.get("/trip/search?lat=#{lat}&lon=#{lon}&proximity=50&limit=#{limit}&min_duration=#{min_time}&activities=5", options)
  end
end