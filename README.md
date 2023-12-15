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

### Dev-Env as code with `nix-shell`
We use nix package manager to get a consistent developer experience across devices (Linux/macOS):

- shell.nix -- equivalent of package.json but for system packages
- .nix/source.json -- equivalent of package-lock.json but pinned to a commit in the nix package repo

[Installing the Required Nix Tools](https://confluence.sys.kth.se/confluence/pages/viewpage.action?pageId=193409170) and setting up your editor. This page also contains instructions or pointers for how to set up your editor.

Run `nix-shell` in the root directory and it will install the required packages for the project. You won't need nvm or similar to switch Node.js version and you will get the correct version of Node.js, az, openssl, etc.

#### Setting up your own environment
The Nixpkgs-setup is a declarative configuration of the development environment. You can choose to install the packages manually on your local system.

## LADOK Atom-feed integration
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