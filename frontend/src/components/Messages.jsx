import React, { useEffect, useRef, useState } from 'react'
import Message from './Message'
import useConversation from '../zustand/useConversation';
import { toast } from "react-hot-toast";
import SummaryApi from '../common';
import { useDispatch, useSelector } from 'react-redux';
import { setMessages } from '../redux/messageSlice';


const Messages = () => {
    const [loading, setLoading] = useState(false);
    const messages = useSelector((state) => state.message.messages);
    const dispatch = useDispatch();
    const selectedConversation = useSelector((state) => state.user.selectedUser);
    const { socketConnection } = useConversation();
    const lastMsgRef = useRef();

    useEffect(() => {
        socketConnection?.on("new-message", (newMessage) => {
            dispatch(setMessages([...messages, newMessage]));
        });

        return () => socketConnection?.off("newMessage");
    }, [messages, setMessages]);





    const getMessages = async () => {
        setLoading(true);

        try {
            const res = await fetch(SummaryApi.getMessages.url + `${selectedConversation._id}`, {
                method: SummaryApi.getMessages.method,
                credentials: "include",
                headers: {
                    "content-type": "application/json"
                }
            });

            const result = await res.json();

            if (result.error) {
                toast.error(result.message);
            } else {
                dispatch(setMessages(result?.data));
            }
        } catch (err) {
            toast.error(err.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (selectedConversation?._id) {
            getMessages();
        }
    }, [selectedConversation?._id, setMessages]);


    useEffect(() => {
        setTimeout(() => {
            lastMsgRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
    }, [messages, setMessages]);


    return (
        <div className='px-4 -mt-4 flex-1 overflow-auto max-h-[calc(90vh-19vh)]'>

            {
                !loading && messages.length > 0 && messages.map((message, index) => {
                    return <div key={index} ref={lastMsgRef}>
                        <Message
                            message={message}
                        >
                        </Message>
                    </div>
                })
            }

            {
                loading && <p className='w-full text-center'><span className="loading loading-infinity loading-lg "></span></p>
            }

            {
                !loading && messages.length == 0 && <p className=' text-center font-bold '>Send a Message to Start a conversation.</p>
            }

        </div>
    )
}

export default Messages
