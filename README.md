# Course Survey Integration API
API-integration för kursutvärderingar (Artologik)

Status: **Implementationsfas**

- [Projektdokumentation](https://confluence.sys.kth.se/confluence/pages/viewpage.action?pageId=198838783)
- [Arbetsdokument](https://docs.google.com/presentation/d/130XPuty8Ge5W5XzxiUvW_oG1ThBXwvA0p7lFy_mIxo4)
- [API-specifikation](./course-survey-integration-api.spec.yml)

## Development

In this project we use Test Driven Development (TDD). This requires you to write each test before you implement the code.

When integrating with data sources you:

1. create a high level library abstraction specific to that data source
2. make sure all the methods are covered by tests
3. all error states are documented, handled and logged

The basic architecture will be:

1. for event listeners
- a function that
- may call a data source library abstraction
- and stores data in the database

2. for API-endpoints
- a function that
- reads data from the database
- and may call a data source library abstraction
