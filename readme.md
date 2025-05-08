# Carlsmed Project

Full stack SPA application built in with React (Vite) and Express.js with PostgreSQL and AWS-S3 data store.

## Backend
---
### Brief description and design decisions
The backend being built with Express.js leverages a few very important features of the framework. I believe that one of the key things that stands out in my project is the separation of concerns and how the usage of modules interacts with the core of the service (server init, routes, etc), keeping that to a bare minimum.
For example, the applciation middleware and route middleware is split out into its own module, only to be used in the ./server.js and ./routes/memes.ts, keeping those files minimal and simple. Its a pattern that I tried to be consistent with throughout the project.
The routeHandlers are split into there own module only to be used within ./routes/memes.ts. The AWS-S3 handlers are only to be used throughout the handler modules where more complex interaction with S3 is taking place. The key thing for me to keep in mind is how well the current design of the modules scales when more modules are added and more functionality is required. In my experience, it's best to scale horizontally (minimal core, many small modules) rather than vertically in these cases, keeping the developer experience in mind.

### Why AWS-S3?
I chose S3 as a file upload storage mainly because of my previous experience with it and usage of the aws-sdk for Node.js. I haven't used the aws-sdk in a little and noticed that it changed quite a bit (for the better in my opinion) so that took a little bit of learning and getting used to. 
The design decison of using a file storage service came from my experience of saving blob data to a main database. I've noticed some increased latency on large file bodies being saved to DB should be saved to some sort of document storage when possible.

### New Stuff - Things I Learned
I've had to learn a few new things for this project which I was particularly excited about. I've never used the Prisma ORM before and found it to be really enjoyable to work with! I thought creating and updating the schema to be really useful with a very declarative approach. Also, the API to create actions upon the DB was also very simple. I'd recommend this tool to anyone, either, learning ORM's or looking to change solutions.
As previously mentioned, the AWS-SDK/@client-s3 is something I'd love to dig into a bit more. The API has changed so much and it so much easier to work with now! It's pretty exciting.

### Future work
There was quite a few things I'd love to add to this project given more time. I ran my database locally but would've made it a docker container along with the serve.
Logging and rate limiting, I'd make it a bit more tailored - meaning I'd split the logs out into individual info, warn, error log files with rotation. The updates to rate limiting would be more geared towards the IP address and amount of requests in a given time period. 

## Setup and Run
Working specifically in the carlsmed-project/server.

### Prerquisites
-   Installed and PostgreSQL running locally
-   Node.js v20 or greater installed

1. Install dependencies
```sh
$ npm install
```

2. Create database carslmed_db inside of PostgreSQL server
```sh
$ create database carlsmed_db;
```

3. Retrieve connection string from newly created database and paste into carlsmed-project/.env file
```sh
DATABASE_URL="postgres://<your user>@localhost:5432/carlsmed_db"
```

4. I've created some user keys for you to test out with AWS-S3. These belong to a new user specifically for this project and will be deleted after evaluation of this project. Paste into carlsmed-project/.env file
```sh
AWS_ACCESS_KEY="<send in 3rd party>"
AWS_SECRET_KEY="<send in 3rd party>"
```

5. Run the application with npm. After this step the server should now be up and running and ready to accept requests!
```sh
$ npm run dev

> server@1.0.0 dev
> tsx watch server.ts

Server listening on port: 3001
```

## FrontEnd
---
The front end was built with React (Vite), using the styled-components library for CSS. My overall structure on the frontend is pretty simple and straight forward. The root (main.tsx) holds the route defintions using react-router with the main components assigned to the individual route found in client/src/containers. And child components off of the container components can be found in client/src/components.
The styles for each individual component can be found in component itself using the styled-components library.

### New Stuff - Things I learned
I've never used Vite before and am pretty impressed with it. In the past, I've really only every rolled react applcations by hand or with create-react-app. I found Vite to be a very slimmed down and easy to work with tool! I'd recommend this to anyone looking to get a React app spun up quickly with quite a bit of tooling right out the box! 

### Future work
For future work and enhancements, I'd put a bit more effort into the styles and making the application look and behave with a bit more fluidity..which might include loading spinners, highly responsive styling at small screens. I kind of broke a rule of mine using flexbox for layout specific styling when I should've used css-grid. Again, not under a time constraint I'd go back and change this.

### Setup and Run
Working specifically in the carlsmed-project/client in a separate terminal from the running server.

### Prerquisites
-   Node.js v20 or greater installed

1. Install dependencies
```sh
$ npm install
```

2. Run with npm using Vite. Navigate to http://localhost:3000 to see the running app!
```sh
$ npm run dev

> client@0.0.0 dev
> vite

  VITE v6.3.4  ready in 584 ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```