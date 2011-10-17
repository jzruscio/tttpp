#!/usr/bin/ruby

require 'rubygems'
require 'bundler/setup'

require 'sinatra'
require 'sequel'
require 'pg'
require 'activesupport'
require 'haml'
require 'sass'
require 'bcrypt'
require 'rack-flash'
require 'sinatra/redirect_with_flash'
require 'json'

use Rack::Session::Cookie
use Rack::Flash

class TTTPP < Sinatra::Application

  get '/' do
    haml :index
  end

  get '/play' do
    haml :play, :layout => :layout
  end

  get "/sass/:sheet.css" do |sheet|
    sass :"sass/#{sheet}"
  end

  get "/css/:sheet.css" do |sheet|
    "css/#{sheet}"
  end

end

__END__
@@index
.grid_5
  %img.displayed{:src => 'images/TTTpp_Logo.png'}
.grid_10
  .center
    %h1.orange Are you Ready?
    %a.orange{:href => '/play'}Play
