require("dotenv").config();
import express from "express";
import initWebRouter from "./routes/web";
import initAPIRouter from "./routes/api"
import configCors from "./config/cors";

const app = express();
const port = process.env.PORT || 3000;

configCors(app)
app.use(express.json());
// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// init routes
initWebRouter(app);
initAPIRouter(app)
app.use((req, res) => {
  res.status(404).json({
    message: "Route not found"
  });
});



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
