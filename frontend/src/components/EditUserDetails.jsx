import React, { useRef, useState } from 'react'
import SummaryApi from '../common';
import uploadFile from "../helper/uploadFile";
import { toast } from "react-hot-toast"
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../redux/userSlice';


const EditUserDetails = ({ onClose }) => {
    const user = useSelector(state => state.user.authUser);
    const [data, setData] = useState({
        name: user?.fullName,
        profilePic: user?.profilePic
    });
    const uploadPhotoRef = useRef();
    const dispatch = useDispatch();


    const handleChange = (e) => {
        const { name, value } = e.target;

        setData((prev) => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    const handleUploadPhoto = async (e) => {
        const file = e.target.files[0];


        const uploadImageCloudinary = await uploadFile(file);

        if (uploadImageCloudinary?.url) {
            toast.success("Profile Photo Updated successfully ....");
        }

        setData((prev) => {
            return {
                ...prev,
                profilePic: uploadImageCloudinary?.url
            }
        });
    }

    const handleOpenUploadPhoto = (e) => {
        e.stopPropagation();
        e.preventDefault();

        uploadPhotoRef.current.click();
    }

    const handleSubmit = async (e) => {
        e.stopPropagation();
        e.preventDefault();




        const res = await fetch(SummaryApi.updateUser.url, {
            method: SummaryApi.updateUser.method,
            credentials: "include",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const result = await res.json();
        // console.log("update result >>", result);

        if (result.error) {
            toast.error(result.message);
        } else {
            toast.success(result.message);
            dispatch(setUser(result?.data));
            onClose();
        }


    }
    return (
        <div className=' fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-opacity-70 bg-slate-400 z-10'>
            <div className=' bg-black w-full max-w-md rounded-md p-6'>
                <h1 className=' font-bold text-2xl mb-1 text-center'>Profile Details</h1>
                <p className=' mb-4'>Edit user details</p>

                <form onSubmit={handleSubmit}>
                    <div className=' flex flex-col mb-4 gap-1'>
                        <label htmlFor='name' className=' font-bold'>Name :</label>
                        <input
                            type='text'
                            id='name'
                            name='name'
                            value={data?.name}
                            placeholder='Enter your name'
                            required
                            className='px-2 py-1 rounded focus:outline-primary border-gray-200 border-2 bg-transparent '
                            onChange={handleChange}>
                        </input>
                    </div>

                    <div className=' flex flex-col gap-1'>
                        <div className=' font-bold'>Photo :</div>
                        <div className=' flex items-center gap-2'>
                            <img
                                src={data?.profilePic}
                                alt="profile_pic"
                                className=' w-12 h-12 rounded-full'>
                            </img>
                            <label htmlFor='profile_pic' className=''>
                                <button className=' font-bold text-lg' onClick={handleOpenUploadPhoto}>Change Photo</button>
                                <input
                                    type='file'
                                    id='profile_pic'
                                    className=' hidden'
                                    onChange={handleUploadPhoto}
                                    ref={uploadPhotoRef}>
                                </input>
                            </label>
                        </div>

                    </div>

                    <div className=' w-full border-2 border-gray-200 my-6 '></div>

                    <div className=' flex gap-2 flex-row-reverse'>
                        <button className='  py-1 px-3  font-bold rounded bg-primary text-white hover:bg-secondary'
                            type='submit' onClick={handleSubmit}>Save</button>
                        <button className=' border-primary border-2 py-1 px-3 text-primary font-bold rounded hover:bg-primary hover:text-white' onClick={onClose}>Cancel</button>
                    </div>

                </form>

            </div>
        </div>
    )
}

export default EditUserDetails
