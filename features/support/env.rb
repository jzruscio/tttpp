require File.join(File.dirname(__FILE__), '..', '..', 'tttpp.rb')

require 'capybara'
require 'capybara/cucumber'
require 'rspec'

TTTPP.set(:environment, :test)

World do
  Capybara.app = TTTPP
end

