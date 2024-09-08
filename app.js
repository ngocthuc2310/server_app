const express = require("express");
const mongoose = require("mongoose");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const routerUser = require("./router/user-ro.js");
const routerProduct = require("./router/product-ro.js");
const routerOrder = require("./router/order-ro.js");
const Session = require("./model/session-mo.js");

app.use(routerUser);
app.use(routerProduct);
app.use(routerOrder);
app.use("/image", express.static("upload"));

const Server = require("socket.io").Server;
const http = require("http");
const { log } = require("console");
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    credentials: true,
  },
});
io.on("connection", (socket) => {
  socket.on("chat", (chat) => {
    io.emit("chat", chat);
    if (
      chat.content[chat.content.length - 1].user == "admin" &&
      chat.content[chat.content.length - 1].input == "/end"
    ) {
      Session.updateOne(
        { _id: "66c56e632260fd29dbbe28ac" },
        {
          $set: {
            content: chat.content,
          },
        }
      ).catch((er) => {
        console.log("err:", er.message);
      });
    }
  });
});
app.get("/session", (req, res) => {
  Session.find()
    .then((x) => {
      res.json(x[0]);
    })
    .catch((er) => console.log(er.message));
});

const MONGOOSE =
  "mongodb+srv://ngocthuc231087:SrXpqzt2epxMonz9@cluster0.7kf6zdq.mongodb.net/shop?retryWrites=true";

mongoose
  .connect(MONGOOSE)
  .then((result) => {
    server.listen(5001, () => {
      console.log("server running!");
    });
  })
  .catch((er) => console.log(er.message));
