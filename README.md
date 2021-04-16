# Backend credit card

[Production link Azure](https://credit-card-clip.azurewebsites.net)

[Production link Heroku](https://credit-card-beenjii14.herokuapp.com)

## Prerequisites

To run this sample you will need the following:

* Install Node.js from [here](http://nodejs.org)
* Install Git from [here](https://git-scm.com/downloads)
* Have shell or command line (If you use Mac and Linux, you have a terminal pre-installed, if you are using windows you can use git bash)

## Prerequisites (optional)

* Install MongoDB from [here](https://www.mongodb.com/download-center?_ga=2.51199855.799714080.1524437300-1146184949.1522821734#production). Make sure to add the location of the MongoDB server to your environment PATH and run the MongoDB server.
* install a text editor from [here](https://code.visualstudio.com/download).

**NOTE:** If you decide to push new local connections to the development environment, the MongoDB installation step is assumed to be mandatory and must be run locally on your machine when running the application.

## Download the sample application and modules

Next, clone the sample repo and install the NPM.

From your shell or command line:

```bash
git clone https://github.com/beenjii14/credit-card-backend.git

cd credit-card-backend

npm install
```

## Configure the server by creating the .env file in the root of the project

Update `PORT` and `MONGO_URI_PROD` and `MONGO_URI_TEST` in the .env file as the structure that the .env.example file has

* Update `<PORT>` Port through which the server will run.
* Update `<MONGO_URI_PROD>` with the Application Id noted from app registration.
* Update `<MONGO_URI_TEST>` with the Application Id noted from app registration.

## Run the application

```bash
npm run dev
```

## All ready to use the application

> You will have a server successfully running on `http://localhost:<PORT>`.
> The service will be available at `http://localhost:<PORT>/api/v1/`.

## Cards services

| Endpoint | HTTP | Description |
| --- | --- | ---|
| `*/api/v1/card` | POST | Create a new card
| `*/api/v1/card` | GET | Get card list
| `*/api/v1/card/:id` | GET | Get card
| `*/api/v1/card/:id` | DELETE | Delete card

### Params

Mandatory send params for the correct functioning:

* **id** (ObjectId): Unique identifier of the card.

## Extra commands

Run the eslint

```bash
npm run lint
```

Run the unit tests

```bash
npm run test
```

## License

MIT (c) Benjamin Manuel
