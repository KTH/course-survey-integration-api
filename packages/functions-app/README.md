# LADOK Atom-feed integration
This function listens to the LADOK Atom-feed for messages to create:

- course rounds
- program rounds
- various course events

The base entity is course round which is stored in a database (MongoDB). The course round is then decorated with data according to the OpenAPI-specification (course-survey-integration-api.spec.yml).

- Look at https://github.com/KTH/kopps-ladok3-events

## ladok3-feed events


### context.triggerMetadata.userProperties
- ladok3EventAtomFeed: 'https://api.ladok.se:443/uppfoljning/feed/317103'
- ladok3EventMessageType: 'ladok3Event'
- ladok3EventType: 'se.ladok.schemas.resultat.AnmalanPaAktivitetstillfalleEvent'
- ladok3EventId: '28df899c-8fa8-11ee-855f-fd8b685e450d'
  - equivalent to: message.HandelsUID, context.handelseUID
- ladok3EventMessageSequenceNumber: 123240