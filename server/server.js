const express = require("express");
const dotenv = require("dotenv");
const connectDb = require("./config/dbConnection");
const userRoutes = require("./Routes/userRoutes");
const errorHandler = require("./middleware/errorHandler");
dotenv.config();

connectDb();

const app = express();
app.use(express.json());
app.use("/user", userRoutes);

//Middlewares
// app.use(errorHandler);

const port = process.env.PORT || 5001;
app.listen(port, () => {
  console.log(`Hi ${port}`);
});
