# Ecran de conference interactif

### Membres

* Guillaume Borg
* Max Destors
* Bezeid Moulaye-ely
* Romain Palmero

## Features

### Chairman / Assistant
* To receive question in real time.
* To receive question where speaker as not respond in order to ordonnance them for the last session's question.
* To ordonnance questions by date or up vote.
* To answer questions.
* To mask useless questions.
* To Merge questions.
* To write her own questions.
* To Send note for speaker.
* To notify speaker about times up.

### Moderator
* Can validate and edit a question
* Can send a question

### Public
* Can send a question and receive in real time
* Can see all questions
* Can see answered questions 

### Screen
* Can receive and display a question
* Can receive and display a tweet

### Speaker
* Can receive and display a question
* Can valid a question
* Can send back to assistant a question
* can receive a note from the assistant
* timer

## Installation

#### Requirements
To run the application, you'll need: <br />
* NodeJS with NPM installed
* Grunt
* Socket.io 
* ExpressJs
* To have MySQL Database

First of all, import in your MySQL Database : /backend/database/databaseScript_V2.sql


#### Downloading the Dependencies
After cloning the source code from Git, you need to run the following command to download all the dependencies (socket.io, express, etc.) in :<br />
/backend<br />
/frontend

```
npm install
```

Then, install all frontend package in each frontend Application. So run the following command to download all frontend dependencies in :<br />
/frontend/chairman<br />
/frontend/moderator<br />
/frontend/public<br />
/frontend/screen<br />
/frontend/speaker

```
bower install
```


#### Running the Server
After downloading all the dependencies, you can run the server with the following command in /backend:

```
npm start
```

The server's api will then be accessible at `http://localhost:3000`.

#### Running each frontend App
After downloading all the dependencies, you can run the following command in :<br />
/frontend/chairman<br />
/frontend/moderator<br />
/frontend/public<br />
/frontend/screen<br />
/frontend/speaker

```
grunt serve
```

Each frontend Application will be accessible at `http://localhost:900[0,1,2,3,4]`.

#### Connect each frontend App
Chairman : <br />
login : chairman<br />
password : azerty<br /><br />

## Unit test

#### Test backend
Run the following command in : /backend

```
npm test
```

#### Test each frontend App
Run the following command in :<br />
/frontend/chairman<br />
/frontend/moderator<br />
/frontend/public<br />
/frontend/screen<br />
/frontend/speaker

```
grunt test
```
