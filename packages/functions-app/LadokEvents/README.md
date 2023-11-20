# LADOK Atom-feed integration
This function listens to the LADOK Atom-feed for messages to create:

- course rounds
- program rounds
- various course events

The base entity is course round which is stored in a database (MongoDB). The course round is then decorated with data according to the OpenAPI-specification (course-survey-integration-api.spec.yml).

- Look at https://github.com/KTH/kopps-ladok3-events