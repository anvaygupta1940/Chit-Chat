import React, { useEffect } from 'react'
import { Link } from "react-router-dom";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Messages from './Messages';
import MessageInput from './MessageInput';
import NoChatSelected from './NoChatSelected';
import useConversation from '../zustand/useConversation';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedUser } from '../redux/userSlice';


const MessageContainer = () => {
    const selectedConversation = useSelector((state) => state.user.selectedUser);
    const dispatch = useDispatch();
    const onlineUsers = useSelector((state) => state.user.onlineUsers);
    const isOnline = onlineUsers?.includes(selectedConversation?._id);

    useEffect(() => {

        return () => {

            // cleanup function 
            // unmounted phase of a component cycle is when the component is removed from the DOM.
            // when we use "useEffect" , you can specify a cleanup function that runs when the component
            // is unmounted or before it is re-rendered
            dispatch(setSelectedUser(null));
        }
    }, []);

    return (
        <div className=' flex flex-col'>

            {
                !selectedConversation ?
                    <section className=' hidden lg:block w-full h-full'>
                        <NoChatSelected></NoChatSelected>
                    </section> :
                    <>
                        {/* header section  */}
                        <header className=' flex py-2 px-5 justify-between items-center'>

                            <div className=' flex gap-3 items-center'>
                                {
                                    <div onClick={() => { dispatch(setSelectedUser(null)) }} className=' lg:hidden cursor-pointer'>
                                        <ArrowBackIosIcon></ArrowBackIosIcon>
                                    </div>
                                }
                                <div className="avatar w-9 h-9">
                                    <div className="ring-primary ring-offset-base-100 w-24 rounded-full ring ring-offset-2">
                                        <img src={selectedConversation?.profilePic} />
                                    </div>
                                </div>

                                <div className=' flex flex-col'>
                                    <h1 className=' font-bold text-ellipsis line-clamp-1'>{selectedConversation?.fullName}</h1>
                                    <p className=' -mt-1 text-teal-500 font-semibold'>{isOnline ? "online" : ""}</p>
                                </div>
                            </div>


                            <button className=' hover:text-teal-800'>
                                <MoreVertIcon></MoreVertIcon>
                            </button>

                        </header>

                        {/* Divider */}
                        <div className="divider px-3 -mt-2"></div>

                        {/* messages part */}
                        <Messages></Messages>


                        {/* message input  */}
                        <MessageInput></MessageInput>
                    </>
            }

        </div>
    )
}

export default MessageContainer
