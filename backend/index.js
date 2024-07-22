const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const messageRoutes = require("./routes/messageRoutes");
const userRoutes = require("./routes/userRoutes");
const cookieParser = require("cookie-parser");
const cors = require("cors");
// const { app, server } = require("./socket/socket");
const { Server } = require("socket.io");
const http = require("http");
const Conversation = require("./models/Conversation");
const Message = require("./models/Message");


/* Middleware configurations */
const app = express();
dotenv.config();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: [process.env.FRONTEND_URL],  // front end url
    credentials: true,
    methods: ["GET", "POST"]
}));


// api routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);
// app.get("/testroute",(req,res)=>{
//     res.cookie("test","testval")
//     res.send("working ?")
// })


// socket
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: process.env.FRONTEND_URL,
        methods: ["GET", "POST"],
    },
});



const userSocketMap = {} // {userId -> Socket Id}

io.on("connection", (socket) => {
    console.log("Socket Id >>", socket.id);

    const userId = socket.handshake.query.userId;
    if (userId !== "undefined") userSocketMap[userId] = socket.id;

    // getting details of users which are online
    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    // sending a message
    socket.on("send-message", async (data) => {
        const receiverId = data?.receiverId;
        const senderId = data?.senderId;
        const { text, imageUrl, videoUrl } = data;

        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] }
        });

        if (!conversation) {
            const newConversation = new Conversation({
                participants: [senderId, receiverId]
            });
            conversation = await newConversation.save();
        };

        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            videoUrl,
            imageUrl
        });

        const message = await newMessage.save();

        if (message) {
            conversation.messages.push(message._id);
            await conversation.save();
        }

        const receiverSocketId = userSocketMap[receiverId];
        const senderSocketId = userSocketMap[senderId];
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("new-message", message);
        }
        io.to(senderSocketId).emit("new-message", message);
    })



    socket.on("disconnect", () => {
        console.log("User disconnected ", socket.id);
        delete userSocketMap[userId];
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    })
})

// const getReceiverSocketId = (receiverId) => {
//     return userSocketMap[receiverId];
// }
// module.exports = { io, getReceiverSocketId };



const PORT = process.env.PORT || 8080;
mongoose.connect(process.env.MONGO_URL).then(server.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`);
    console.log(`Database is connected successfully ...`);
})).catch((err) => {
    console.log(`Error in connecting with database ${err}`);
})


