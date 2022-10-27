const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const doctorsRoutes = require("./routes/doctorRoutes");
const adminRoutes = require("./routes/adminRoutes");
const socketio = require("socket.io");
const http = require("http");

const app = express();
const server = http.createServer(app);
const io = socketio(server);
dotenv.config();         
connectDB();
const PORT = process.env.PORT || 6000;

app.use(express.json({ limit: "50mb" }));

app.use("/user", userRoutes);   
app.use("/admin", adminRoutes);
app.use("/doctor", doctorsRoutes);




server.listen(PORT, console.log(`server started on port ${PORT}`));
