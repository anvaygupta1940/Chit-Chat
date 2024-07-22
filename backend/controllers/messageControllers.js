const Conversation = require("../models/Conversation");
const Message = require("../models/Message");
const { getReceiverSocketId, io } = require("../index");


const sendMessage = async (req, res) => {
    try {
        const { receiverId } = req.params;
        const senderId = req.user._id;
        const { text, imageUrl, videoUrl } = req.body;

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

        // socket 
        const receiverSocketId = getReceiverSocketId(receiverId);
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("new-message", message);
        }

        return res.status(201).json({
            message: "Message send successfully ...",
            error: false,
            data: message
        });

    } catch (err) {
        return res.status(500).json({
            message: err?.message || err,
            error: true
        })
    }
}


const getMessages = async (req, res) => {
    try {

        const { receiverId } = req.params;
        const senderId = req.user._id;

        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] }
        }).populate("messages");

        if (!conversation) {
            return res.status(200).json({
                data: []
            });
        }

        const messages = conversation.messages;
        return res.status(200).json({
            message: "All messages of the conversation",
            data: messages
        });

    } catch (err) {
        return res.status(500).json({
            message: err?.message || err,
            error: true
        })
    }
}


module.exports = { sendMessage, getMessages }