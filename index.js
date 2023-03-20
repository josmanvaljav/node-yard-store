const express = require("express");
const cors = require("cors");
const routerApi = require("./Router");
const { logError, errorHandler, boomErrorHandler } = require("./middleware/errorHandler");
const app = express();
const port = process.env.PORT || 3500;

// app.get("/", (request, response) => {
//   response.send("my express server");
// });

routerApi(app);

const whitelist = ["http://localhost:8080", "https://myapp.com"];
const option = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true); // null error and Ok.
    } else {
      callback(new Error("server and port not allowed"));
    }
  }
};
app.use(cors());

// Middleware after the routerApi
app.use(logError); // this has Next(error)
app.use(boomErrorHandler);
app.use(errorHandler); // this finishes the error sequential because doesn't have Next(error)

app.listen(port, () => {
  console.log("Port: " + port);
});
