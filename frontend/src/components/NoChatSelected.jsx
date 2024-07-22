import React from 'react'
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import { useSelector } from 'react-redux';


const NoChatSelected = () => {
    const authUser = useSelector((state) => state.user.authUser);

    return (
        <div className='w-full h-full flex justify-center items-center'>
            <div className=' flex flex-col justify-center items-center gap-2 font-bold sm:text-lg md:text-xl lg:text-3xl'>
                <p className=''>Welcome 👋 {authUser?.fullName} .</p>
                <p>Select a Chat to start messaging.</p>
                <QuestionAnswerIcon style={{ fontSize: 60 }}></QuestionAnswerIcon>
            </div>
        </div>
    )
}

export default NoChatSelected
