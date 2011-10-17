Feature: view pages

  Scenario: Home page
    Given I am viewing "/"
    Then I should see "Triple Threat Tournament Ping Pong!"

  Scenario: Start new game
    Given I start a new game
    Then I should be on the new game page

  @javascript
  Scenario: Setup new game
    Given I start a new game
    And I add the following players:
      | player |
      | Jory |
      | Winton |
      | Frulwinn |
      | Eugene |
    Then there should be active players

  @javascript
  Scenario: Add more players
    Given I start a new game
    And I need to add more players
    Then there should be another add player row
