# specify mail
ActionMailer::Base.smtp_settings = {
  :user_name => "wvm2009",
  :password => "Wi11iam!",
  :domain => "get-out.herokuapp.com",
  :address => "smtp.sendgrid.net",
  :port => 587,
  :authentication => :plain,
  :enable_starttls_auto => true
}

# Load the rails application
require File.expand_path('../application', __FILE__)

# Initialize the rails application
GetOut::Application.initialize!
