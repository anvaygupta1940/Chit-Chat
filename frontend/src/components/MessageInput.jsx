import React, { useState } from 'react'
import SendIcon from '@mui/icons-material/Send';
import useConversation from '../zustand/useConversation';
import { toast } from "react-hot-toast";
import SummaryApi from '../common';
import { useDispatch, useSelector } from 'react-redux';
import { setMessages } from '../redux/messageSlice';


const MessageInput = () => {
    const [loading, setLoading] = useState(false);
    const messages = useSelector((state) => state.message.messages);
    const selectedConversation = useSelector((state) => state.user.selectedUser);
    const dispatch = useDispatch();
    const [message, setMessage] = useState("");
    const { socketConnection } = useConversation();
    const { authUser } = useSelector((state) => state.user);


    const sendMessage = async (e) => {

        e.preventDefault();

        if (!message) return;

        setLoading(true);
        try {
            // const res = await fetch(SummaryApi.sendMessage.url + `${selectedConversation?._id}`, {
            //     method: SummaryApi.sendMessage.method,
            //     credentials: "include",
            //     headers: {
            //         "content-type": "application/json"
            //     },
            //     body: JSON.stringify({ text: message })
            // });

            // const result = await res.json();

            // if (result.error) {
            //     toast.error(result.message);
            // } else {
            //     dispatch(setMessages([...messages, result.data]));
            //     setMessage("");
            // }

            if (socketConnection) {
                socketConnection.emit("send-message", {
                    senderId: authUser?._id,
                    receiverId: selectedConversation?._id,
                    videoUrl: "",
                    imageUrl: "",
                    text: message
                });

                setMessage("");
            }
        } catch (err) {
            toast.error(err.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className=' px-4 py-2'>
            <form className=' w-full  flex rounded-md bg-gray border-white border-2' onSubmit={sendMessage}>
                <input type='text' placeholder=' Send a message' className=' bg-transparent flex-1 p-2.5 text-white outline-none placeholder-white'
                    value={message} onChange={(e) => setMessage(e.target.value)}></input>
                <button className=' text-teal-500 pr-2' type='submit' disabled={loading}>
                    {
                        loading ? <>
                            <span className="loading loading-spinner loading-lg mx-auto"></span>
                        </> : <SendIcon style={{ fontSize: 30 }}></SendIcon>
                    }

                </button>
            </form>
        </div>
    )
}

export default MessageInput
