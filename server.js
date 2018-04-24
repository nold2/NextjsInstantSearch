const express = require("express");
const next = require("next");
const Router = require("./routes");
const app = next({
  dev:
    process.env.NODE_ENV !== "production" &&
    process.env.NODE_ENV !== "staging" &&
    process.env.NODE_ENV !== "remotedev"
});

const server = express();
const handle = Router.getRequestHandler(app);

app.prepare().then(() => {
  const port = process.env.PORT || 3000;
  server.get("*", (req, res) => handle(req, res));
  server.listen(port, err => {
    if (err) {throw err;}
    console.log(
      `> Env ${process.env.NODE_ENV} Readys on http://localhost:${port}`
    ); // eslint-disable-line no-console
  });
});
