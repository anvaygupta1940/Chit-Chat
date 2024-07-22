import React, { useEffect, useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import useConversation from '../zustand/useConversation';
import { toast } from "react-hot-toast";
import SummaryApi from '../common';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedUser } from '../redux/userSlice';

const SearchContainer = () => {
    const [search, setSearch] = useState("");
        const conversations = useSelector(state => state.user.otherUsers);
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!search) return;
        if (search.length < 3) {
            return toast.error("Search must be atleast 3 character long.");
        }

        const conversation = conversations.find((c) => c.fullName.toLowerCase().includes(search.toLowerCase()));

        if (conversation) {
            dispatch(setSelectedUser(conversation));
            setSearch("");
        } else {
            toast.error("No User found !!");
        }

    }
    return (
        <form className=' flex gap-2 items-center px-4 -mt-3' onSubmit={handleSubmit}>
            <input type="text" placeholder="Search..." className="input input-bordered w-full  rounded-full flex-1"
                value={search} onChange={(e) => setSearch(e.target.value)} />
            <button type='submit' className="btn btn-circle btn-outline hover:bg-teal-800 hover:text-white">
                <SearchIcon></SearchIcon>
            </button>
        </form>
    )
}

export default SearchContainer
