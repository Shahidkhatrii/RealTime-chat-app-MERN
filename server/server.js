const express = require("express");
const dotenv = require("dotenv");
const connectDb = require("./config/dbConnection");
const userRoutes = require("./Routes/userRoutes");
const chatRoutes = require("./Routes/chatRoutes");
const messageRoutes = require("./Routes/messageRoutes");
const errorHandler = require("./middleware/errorHandler");
const { Server } = require("socket.io");
const { createServer } = require("http");
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
const httpServer = createServer(app);
const port = process.env.PORT || 5001;
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
  pingTimeout: 60000,
});

io.on("connection", (socket) => {
  // console.log("new user is connected", socket.id);
  socket.on("setup", (user) => {
    socket.join(user.data._id);
    // console.log("joined user", user.data._id);
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    // console.log("users joined room:", room);
  });
  socket.on("newMessage", (newMessageStatus) => {
    // console.log("new message....");
    // console.log(newMessageStatus, "new msg...");
    var chat = newMessageStatus.chat;
    if (!chat.users) {
      return console.log("chat.users not defined");
    }
    chat.users.forEach((user) => {
      if (user._id == newMessageStatus.sender._id) return;
      socket.in(user._id).emit("message received", newMessageStatus);
      // console.log("message received emitted...");
    });
  });
});
httpServer.listen(port, () => {
  console.log("server is running on ", port);
});
