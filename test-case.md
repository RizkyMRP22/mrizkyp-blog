1. explore case from this project
2. create test case with bdd style from this web project

feature: [feature name]
  scenario: [scenario name]
    given [context]
    when [action]
    then [outcome]

example:
    feature: User Login
      scenario: Successful login with valid credentials
        given I am on the login page
        when I enter valid credentials
        then I should be redirected to the dashboard

3. replace case Interactive Test Case Runner in test artifacts with this case

