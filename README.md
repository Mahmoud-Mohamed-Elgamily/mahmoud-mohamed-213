# Technologies:
- nestjs
- typescript
- mysql

# Featuring
- consuming prices through api
- persist data in db
- process data to update prices

# Installation:

- Clone this repository: **$ git clone git@github.com:Mahmoud-Mohamed-Elgamily/mahmoud-mohamed-213.git**
- create mysql database
- create .env file **$ cp .env.temp .env**
- Install dependencies: **$ npm install**
- Start the development server: **$ npm run start**

# Walkthrough
- after starting the app it will start running in the background
- each minute data will be fetched based on env variable or default 1000 and insert into database
- after that it will trigger token calculation to calculate updated prices for each item

# Assumptions
- cron job will handle fetching data over time
- after fetching manually trigger the method that updates token prices
  - can be updated to trigger using api call or trigger event for lose coupling 
- there is no order.validTo column so I used validUntil instead
- listing_to is the sum of event.order.validUntil and event.event.createdAt

# Possible Enhancement
- run multiple instances of the app with different schedule
- caching or passing activities directly instead of refetching from database 
  - ( this applies if both modules are running on the same machine)
- different mechanism for updating prices instead of doing it one by one
- retry mechanism that runs every set interval or something to process any unprocessed data