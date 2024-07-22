import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from '../redux/userSlice';


const Conversation = ({ conversation }) => {
    const selectedConversation = useSelector(state => state.user.selectedUser);
    const onlineUsers = useSelector((state) => state.user.onlineUsers);
    const isOnline = onlineUsers?.includes(conversation?._id);
    const dispatch = useDispatch();
    const isSelectedConv = selectedConversation?._id === conversation?._id;

    return (
        <div className={` flex gap-2 items-center hover:bg-teal-500 cursor-pointer rounded-md p-2 py-1 ${isSelectedConv ? "bg-teal-500" : ""}`}
            onClick={() => dispatch(setSelectedUser(conversation))}>

            <div className={`avatar ${isOnline ? "online" : ""}`}>
                <div className="w-12 rounded-full">
                    <img src={conversation?.profilePic}
                        alt='profilePic' />
                </div>
            </div>

            <div className=' flex justify-between flex-1 items-center'>
                <span className=' font-bold text-ellipsis line-clamp-1'>{conversation?.fullName}</span>
                <span className=' text-[16px]'></span>
            </div>
        </div>
    )
}

export default Conversation
