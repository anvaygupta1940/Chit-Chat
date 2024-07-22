import React, { useEffect, useState } from 'react'
import Conversation from './Conversation'
import { toast } from "react-hot-toast";
import SummaryApi from '../common';
import { useDispatch } from "react-redux";
import { setOtherUsers } from '../redux/userSlice';


const Conversations = () => {
    const [loading, setLoading] = useState(false);
    const [conversations, setConversations] = useState([]);
    const dispatch = useDispatch();

    const getConversations = async () => {
        setLoading(true);
        try {
            const res = await fetch(SummaryApi.getSidebarConv.url, {
                method: SummaryApi.getSidebarConv.method,
                credentials: "include",
                headers: {
                    "content-type": "application/json"
                }
            });

            const result = await res.json();

            if (result.error) {
                toast.error(result.error);
            }
            else {
                setConversations(result.data);
                dispatch(setOtherUsers(result.data));
            }

        } catch (err) {
            toast.error(err.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getConversations();
    }, []);


    return (
        <div className=' px-4 -mt-1 flex flex-col gap-2 h-[calc(90vh-25vh)] overflow-x-hidden overflow-y-scroll scrollbar'>
            {
                loading ? <>
                    <span className="loading loading-spinner loading-lg mx-auto"></span>
                </> :
                    conversations.map((conv, index) => {
                        return <Conversation
                            key={index}
                            conversation={conv}
                        >
                        </Conversation>
                    })
            }

        </div>
    )
}

export default Conversations
