require("dotenv").config();
import express from "express";
import initWebRouter from "./routes/web";
import initAPIRouter from "./routes/api"

const app = express();
const port = process.env.PORT || 3000;

// init routes
initWebRouter(app);
initAPIRouter(app)
app.use(express.json());
// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
