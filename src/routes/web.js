const express = require("express");

const router = express.Router();
const initWebRouter = (app) => {
  router.get("/", (req, res) => {
    res.send("Hello World!");
  });
  app.use("/", router);

  return app
};
export default initWebRouter;
