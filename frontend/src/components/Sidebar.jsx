import React, { useState } from 'react'
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useSelector } from 'react-redux';
import SearchContainer from './SearchContainer';
import Conversations from './Conversations';
import LogoutIcon from '@mui/icons-material/Logout';
import SummaryApi from '../common';
import { toast } from "react-hot-toast";
import { useDispatch } from 'react-redux';
import { logout } from '../redux/userSlice';
import { useNavigate } from "react-router-dom";
import EditUserDetails from './EditUserDetails';


const Sidebar = () => {
    const [openEditUserInfoBox, setOpenEditUserInfoBox] = useState(false);
    const authUser = useSelector(state => state.user.authUser);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const handleLogout = async () => {
        setLoading(true);
        try {
            const res = await fetch(SummaryApi.logout.url, {
                method: SummaryApi.logout.method,
                headers: {
                    "content-type": "application/json"
                }
            });

            const result = await res.json();

            if (result.error) {
                toast.error(result.message);
            } else {
                toast.success(result.message);
                dispatch(logout());
                localStorage.removeItem('chat-user');
                navigate("/login");
            }

        } catch (err) {
            toast.error(err.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className=' border-r border-slate-200'>

            {/* Header */}
            <div className=' flex items-center justify-between p-3 px-4 '>
                <h1 className=' text-3xl text-teal-500 font-bold'>ChitChat</h1>
                <div className=' flex gap-2 items-center'>
                    <div className=' w-8 h-8 cursor-pointer rounded-full overflow-hidden' title={authUser?.fullName}
                        onClick={() => setOpenEditUserInfoBox(true)}>
                        <img src={authUser?.profilePic}
                            className=' h-full w-full'>
                        </img>
                    </div>
                    <button className=' cursor-pointer' onClick={handleLogout} disabled={loading} title="Logout">
                        {
                            loading ? <>
                                <span className="loading loading-dots loading-lg"></span>
                            </> : <LogoutIcon style={{ fontSize: 30 }}></LogoutIcon>
                        }
                    </button>
                </div>
            </div>

            {/* Divider */}
            <div className="divider px-3 -mt-2"></div>

            {/* Search box */}
            <SearchContainer></SearchContainer>

            {/* Divider */}
            <div className="divider px-3 mt-2"></div>

            {/* Conversations */}
            <Conversations></Conversations>


            {/* open edit user details box */}
            {
                openEditUserInfoBox && (
                    <EditUserDetails onClose={() => setOpenEditUserInfoBox(false)}></EditUserDetails>
                )
            }



        </div>
    )
}

export default Sidebar
