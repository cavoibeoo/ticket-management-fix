const express = require("express");
const server = express();
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/Auth");
const projectRoutes = require("./routes/Project");
const ticketRoutes = require("./routes/Ticket");
const adminRoutes = require("./routes/Admin");
const commentRoutes = require("./routes/Comment");
const memberRoutes = require("./routes/Member");
const { connectToDb } = require("./database/db");

// database connection
connectToDb();

// middleware
server.use(express.json());
server.use(cookieParser());
server.use(morgan("tiny"));
server.use(cors({ credentials: true, origin: "http://localhost:3000" }));
server.use(express.urlencoded({ extended: true }));

// route middlewares
server.use("/auth", authRoutes);
server.use("/projects", projectRoutes);
server.use("/tickets", ticketRoutes);
server.use("/admin", adminRoutes);
server.use("/members", memberRoutes);
server.use("/comments", commentRoutes);

server.get("/", (req, res) => res.send("Express on Vercel"));

server.listen(8000, () => {
    console.log("server [STARTED] ~ http://localhost:8000");
});

module.exports = server;
