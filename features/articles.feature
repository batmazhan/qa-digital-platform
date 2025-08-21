Feature: JSON:API Articles

  Scenario: Get list of articles
    Given I am on "/jsonapi/node/article"
    Then the response status code should be 200
    And the response should contain "jsonapi"
    And the response should match "/\"type\"\s*:\s*\"node--article\"/"
    And the response should match "/\"id\"\s*:\s*\"[a-f0-9-]{8,}\"/"
    And the response should match "/\"attributes\"\s*:\s*{/"
