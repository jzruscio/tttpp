require File.expand_path(File.join(File.dirname(__FILE__), "..", "support", "paths"))

Given /^I am viewing "([^"]*)"$/ do |arg1|
  visit '/'
end

Then /^I should see "([^"]*)"$/ do |text|
  page.should have_content text
end

Given /^(?:|I )am on (.+)$/ do |page_name|
  visit path_to(page_name)
end

When /^(?:|I )go to (.+)$/ do |page_name|
  visit path_to(page_name)
end

Given /^I start a new game$/ do
  visit '/'
  click_on('Start Game')
end

Then /^I should be on the new game page$/ do
  current_path.should == '/play'
end

Given /^I add the following players:$/ do |table|
  # table is a Cucumber::Ast::Table
  table.hashes.each do |row|
    row = row.with_indifferent_access
    fill_in('name', :with => row[:player])
  end
  click_on('Add Players')
end

Then /^there should be active players$/ do
  page.should have_css("table#active_players tr", :count=>5)
end

Given /^I need to add more players$/ do
  click_on('More')
end

Then /^there should be another add player row$/ do
  page.should have_css("form#add_players_form input", :count=>9)
end
