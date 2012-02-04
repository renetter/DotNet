Feature: Login
	In order to Login
	As a user
	I want to be able to login

Scenario: Click the LogOn link
	Given I am on the index page	
	When I click the Log On link
	Then The login popup screen opened

Scenario: Posting the login detail
	Given I am on the index page
	When I click the Log On link
	And I have filled the form in login popup as follow:
		| Label     | Value    |
		| UserName | Admin    |
		| Password  | Password |
	And I click the button labeled "Log On"
	Then I should see the login popup closed
	And I should see the the label "Welcome Administrator"
	And I should see the login link changed into logout

Scenario: Posting the login detail without entering user name
	Given I am on the index page
	When I click the Log On link	
	And I have filled the form in login popup as follow:
		| Label    | Value    |
		| Password | Password |
	And I click the button labeled "Log On"
	Then I should see error message "The User Name field is required."

Scenario: Posting the login detail without entering password
	Given I am on the index page
	When I click the Log On link	
	And I have filled the form in login popup as follow:
		| Label    | Value    |
		| UserName | Admin |
	And I click the button labeled "Log On"
	Then I should see error message "The Password field is required."

Scenario: Invalid user trying to log on
	Given I am on the index page
	When I click the Log On link	
	And I have filled the form in login popup as follow:
		| Label    | Value    |
		| UserName | Invalid  |
		| Password | password |
	And I click the button labeled "Log On"
	Then I should see error message "The User Name or Password provided is incorrect"

Scenario: Open the login popup and then click cancel
	Given I am on the index page
	When I click the Log On link	
	And I click the button labeled "Cancel"
	Then I should see the login popup closed


