const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
// Will start our node server
// Make sure our variable our available to our application by require them here since it's the entry point of our application
require("dotenv").config({ path: "variables.env" });
// Import the createServer() function that we've made in our createServer.js
const createServer = require("./createServer");
// Import our database that we created
const db = require("./db");

const server = createServer();

// TODO Use express middlware to handle coolies (JWT = Json Web Tokens)
server.express.use(cookieParser());

// TODO Use express middlware to populate current user
// decode the JWT so we can get the user ID on each request
server.express.use((req, res, next) => {
  const { token } = req.cookies;
  // console.log(token);

  if (token) {
    const { userId } = jwt.verify(token, process.env.APP_SECRET);
    // put the userId onto the req for future requests to access
    req.userId = userId;
  }
  next();
});

// 2. Create a middleware that populates the user on each request
server.express.use(async (req, res, next) => {
  // if they aren't logged in, skip this
  if (!req.userId) return next();
  const user = await db.query.user(
    { where: { id: req.userId } },
    '{ id, permissions, email, name }'
  );
  req.user = user;
  next();
});

server.start(
  {
    cors: {
      credentials: true,
      origin: process.env.FRONTEND_URL
    }
  },
  deets => {
    console.log(`Server is now running on port http://localhost:${deets.port}`);
  }
);
