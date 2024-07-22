import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from "react-hot-toast"
import SummaryApi from '../common';


const SignUp = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({
        fullName: "",
        username: "",
        password: "",
        confirmPassword: "",
        gender: ""
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!data.fullName || !data.username || !data.password || !data.confirmPassword || !data.gender) {
            toast.error("Fill all the fields.");
            return;
        }

        if (data.password !== data.confirmPassword) {
            toast.error("Password don't match");
            return;
        }

        if (data.password.length < 6) {
            toast.error("Password must be at least 6 characters");
            return;
        }

        setLoading(true);
        try {
            const res = await fetch(SummaryApi.signUp.url, {
                method: SummaryApi.signUp.method,
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(data)
            });

            const result = await res.json();

            if (result.error) {
                toast.error(result.message);
            }
            else {
                await toast.success(result.message);
                setData({
                    fullName: "",
                    username: "",
                    password: "",
                    confirmPassword: "",
                    gender: ""
                });
                navigate("/login");
            }


        } catch (err) {
            toast.error(err.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="max-w-sm lg:max-w-md w-full border-white border-2 rounded-md p-4 md:px-8">

            <h1 className=' text-center text-xl text-teal-500 my-6 text-wrap'>Enter in <span className=' font-bold text-5xl'>ChitChat</span> World</h1>

            <form className=' grid gap-5' onSubmit={handleSubmit}>

                <label className="input input-bordered flex items-center gap-2">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="h-4 w-4 opacity-70">
                        <path
                            d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                    </svg>
                    <input type="text" className="grow" placeholder="Full Name" value={data.fullName} onChange={(e) => setData({ ...data, fullName: e.target.value })} required />
                </label>

                <label className="input input-bordered flex items-center gap-2">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="h-4 w-4 opacity-70">
                        <path
                            d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                    </svg>
                    <input type="text" className="grow" placeholder="Username" value={data.username} onChange={(e) => setData({ ...data, username: e.target.value })} required />
                </label>

                <label className="input input-bordered flex items-center gap-2">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="h-4 w-4 opacity-70">
                        <path
                            fillRule="evenodd"
                            d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                            clipRule="evenodd" />
                    </svg>
                    <input type="password" className="grow" placeholder="Password" value={data.password} onChange={(e) => setData({ ...data, password: e.target.value })} required />
                </label>

                <label className="input input-bordered flex items-center gap-2">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="h-4 w-4 opacity-70">
                        <path
                            fillRule="evenodd"
                            d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                            clipRule="evenodd" />
                    </svg>
                    <input type="password" className="grow" placeholder="Confirm Password" value={data.confirmPassword} onChange={(e) => setData({ ...data, confirmPassword: e.target.value })} required />
                </label>

                <div className=' flex'>
                    <div className="form-control">
                        <label className="label cursor-pointer gap-2">
                            <span className="label-text">Male</span>
                            <input type="checkbox" defaultChecked className="checkbox"
                                checked={data.gender === "male"}
                                onChange={(e) => setData({ ...data, gender: "male" })}
                            />
                        </label>
                    </div>
                    <div className="form-control">
                        <label className="label cursor-pointer gap-2">
                            <span className="label-text">Female</span>
                            <input type="checkbox" defaultChecked className="checkbox"
                                checked={data.gender === "female"}
                                onChange={(e) => setData({ ...data, gender: "female" })} />
                        </label>
                    </div>
                </div>

                <button type='submit' className="btn btn-xs sm:btn-md md:btn-md lg:btn-md max-w-[60%] mx-auto"
                    disabled={loading}>
                    {loading ? <>
                        <span className="loading loading-dots loading-lg"></span>
                    </> : "Sign Up"}
                </button>

            </form>

            <p className=' text-center my-3'><Link to={"/login"} className=' hover:underline font-semibold hover:text-white text-teal-500 align-center'> Already have and Account?</Link></p>

        </div>
    )
}

export default SignUp
