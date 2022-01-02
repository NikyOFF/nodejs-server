#nodejs-server
version: ``2.2.0``

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
- express
- cookie-parser
- jsonwebtoken
- cors
- csurf
- helmet
- morgan
- passport
- passport-jwt
- typeorm

<h3>Database</h3>
<hr/>

- Any of supported by TypeORM


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
dev | Launches a project in a development environment
build | Compiles the project
agendash | Runs agendash
typeorm | TypeORM CLI


<h3>Folder Structure</h3>
<hr/>

Folder | Description
------------ | -------------
config | Environment variables and configurations
loaders | Modules for split app launch
api | Express routes for all the endpoints of the app
controllers | Controllers for app endpoints routes
services | App business logic
entity | TypeORM entities
subscribers | Event handlers for async task
jobs | Jobs definitions for agenda.js
utils | Useful stuff
`decorators` | `Application decoratos`
`classes` | `Application classe`
`interfaces` | `Application interfaces`
`enums` | `Application enums`
`types` | `Application types`