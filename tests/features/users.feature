Feature: Users

  In order to use the system, users must be logged-in.
  For this we have registration and login pages.

  @userLogin
  Scenario: User Login
    Given I am on login page
    When I enter form fields:
      | email    | director@gmail.com |
      | password | 123             |
    And I click "Sign in" button
    Then I see "Director Directorovich"  user menu.

  @userRegister
  Scenario: User Register
    Given I am on register page
    When I enter form fields:
      | email       | test@gmail.com |
      | password    | 123            |
      | firstName   | Test           |
      | lastName    | Testovich      |
      | phoneNumber | 553211571      |
    And I click "Sign up" button
    Then I see "Test Testovich" user menu.