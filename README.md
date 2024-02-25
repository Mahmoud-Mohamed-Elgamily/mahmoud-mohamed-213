# Technologies:
- nestjs
- typescript
- mysql

# Featuring
- consuming prices through api
- persist data in db
- process data to update prices

# Installation:

- Clone this repository: **$ git clone git@github.com:Mahmoud-Mohamed-Elgamily/file-extension.git**
- create mysql database
- create .env file **$ cp .env.temp .env**
- Install dependencies: **$ npm install**
- Start the development server: **$ npm run start**

# Walkthrough
- after starting the app it will start running in the background
- each minute data will be fetched based on env variable or default 1000 and insert into database
- after that it will trigger token calculation to calculate updated prices for each item