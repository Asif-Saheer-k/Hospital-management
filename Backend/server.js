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
// const {
//   addUser,
//   removeUSer,
//   getUser,
//   getUserInRoom,
// } = require("./routes/socket");
// io.on("connection", (socket) => {
//   socket.on("join", ({ name,room }, callback) => {
//     console.log(name,room,"jjjjjjj");
//     const { error, user } = addUser({ id: socket.id, name, room });
//     if (error) return callback(error);
//     socket.emit("message",{
//       user: "admin",
//       text:`${user.name},welcome to the room ${user.room}`,
//     });
//     socket.broadcast
//       .to(user.room)
//       .emit("message", { user: "admin", text: `${user.room},wecome to the room`});
//     socket.join(user.room);
//     callback();
//   });
//   socket.on("sendMessage", (message, callback) => {
//     const user = getUser(socket.id);                        
//     io.to(user.room).emit("message",{user:user.name, text:message})
//     callback();
//   });    
//   socket.on("disconnect", () => {
//     console.log("user disconnected");
//   });
// });
dotenv.config();
connectDB();
const PORT = process.env.PORT || 6000;

app.use(express.json({ limit: "50mb" }));

app.use("/user", userRoutes);   
app.use("/admin", adminRoutes);
app.use("/doctor", doctorsRoutes);




server.listen(PORT, console.log(`server started on port ${PORT}`));
