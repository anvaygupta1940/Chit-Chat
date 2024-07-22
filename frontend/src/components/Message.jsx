import React from 'react'
import { useSelector } from "react-redux";
import moment from "moment";


const Message = ({ message }) => {
    const currUser = useSelector((state) => state.user.authUser);
    const selectedConversation = useSelector((state) => state.user.selectedUser);

    const isMine = currUser?._id === message.senderId;
    const profilePic = isMine ? currUser.profilePic : selectedConversation?.profilePic;
    const chatClass = isMine ? "chat-end" : "chat-start";

    return (
        <div className={`chat ${chatClass}`}>
            <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                    <img
                        alt="Tailwind CSS chat bubble component"
                        src={profilePic} />
                </div>
            </div>
            <div className="chat-bubble text-white ">{message.text}</div>
            <div className="chat-footer opacity-50">{moment(message?.createdAt).format('hh:mm')}</div>
        </div>
    )
}

export default Message
