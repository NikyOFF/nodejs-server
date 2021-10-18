<h1>nodejs-server</h1>

<h2>Nodejs server template</h2>

__Entry point for app__ — `index.ts`

<h3>Description</h2>
<hr/>

<p>
This template was coded in Typescript language and in framework Express.

It uses mongodb database but using a different database or other technologies is not difficult and
all thanks to design patterns!


</p>

<h3>Languages</h3>
<hr/>

- Typescript v4.4.3

<h3>Technologies</h3>
<hr/>

- dotenv
- reflect-metadata
- winston
- typedi
- event-dispatch
- agenda
- agendash2
- bcryptjs
- celebrate
- mongoose
- express
- cookie-parser
- jsonwebtoken
- cors
- csurf
- helmet
- morgan
- passport
- passport-jwt

<h3>Database</h3>
<hr/>

- MongoDB


<h3>Patterns</h3>
<hr/>

- Configurations
- Loaders
- 3 Layer architecture
- Pub/Sub Layer
- Dependency Injection
- Cron jobs

<h3>scripts</h3>
<hr/>

`npm run {script}`

Script | Description
------------ | -------------
start | Runs the build version of the server
agendash | Runs agendash
build | Compiles the project
dev | Launches a project in a development environment

<h3>Folder Structure</h3>
<hr/>

Folder | Description
------------ | -------------
config | Environment variables and configurations
loaders | Modules for split app launch
api | Express routes for all the endpoints of the app
controllers | Controllers for app endpoints routes
services | App business logic
models | MongoDB models
subscribers | Event handlers for async task
jobs | Jobs definitions for agenda.js
utils | Useful stuff
`classes` | `Application classeы`
`interfaces` | `Application interfaces`
`enums` | `Application enums`
`types` | `Application types`