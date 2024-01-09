const express = require("express");
const dotenv = require("dotenv");
const connectDb = require("./config/dbConnection");
const userRoutes = require("./Routes/userRoutes");
const chatRoutes = require("./Routes/chatRoutes");
const messageRoutes = require("./Routes/messageRoutes");
const errorHandler = require("./middleware/errorHandler");
const cors = require("cors");
dotenv.config();

connectDb();

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

app.use("/user", userRoutes);
app.use("/chat", chatRoutes);
app.use("/message", messageRoutes);
//Middlewares
// app.use(errorHandler);

const port = process.env.PORT || 5001;
app.listen(port, () => {
  console.log(`Hi ${port}`);
});
