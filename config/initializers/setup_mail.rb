=begin
ActionMailer::Base.smtp_settings = {
  :address              => "smtp.gmail.com",
  :port                 =>  587,
  :domain               => "getout.com",
  :user_name            => "wvmitchell",
  :password             => "wi11iam!",
  :authentication       => "plain",
  :enable_starttls_auto => true
}
=end

ActionMailer::Base.smtp_settings = {
  :port           => '25',
  :address        => ENV['POSTMARK_SMTP_SERVER'],
  :user_name      => ENV['POSTMARK_API_KEY'],
  :password       => ENV['POSTMARK_API_KEY'],
  :domain         => 'yourapp.heroku.com',
  :authentication => :plain,
}

ActionMailer::Base.delivery_method = :smtp