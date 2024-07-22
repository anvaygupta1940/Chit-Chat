import React, { useEffect } from 'react'
import Sidebar from '../components/Sidebar'
import MessageContainer from '../components/MessageContainer'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import SummaryApi from '../common';

const Home = () => {
    const authUser = useSelector(state => state.user.authUser);
    const selectedUser = useSelector(state => state.user.selectedUser);
    const navigate = useNavigate();

    useEffect(() => {
        console.log("Entered");
        if (!authUser) {
            navigate("/login");
        }
        else {
            navigate("/");
        }
    }, [authUser]);


    // console.log("user>>", user);

    return (
        <div className="grid lg:grid-cols-[380px,1fr] max-w-[90vw] w-full max-h-[90vh] h-full border-white border-2 rounded-md">
            <section className={`${selectedUser && "hidden"} lg:block`}>
                <Sidebar></Sidebar>
            </section>
            <MessageContainer></MessageContainer>
        </div>
    )
}

export default Home
