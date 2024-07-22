import React, { useEffect, useState } from 'react'
import { RouterProvider } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import router from './routes';
import io from "socket.io-client";
import useConversation from './zustand/useConversation';
import { setOnlineUsers } from './redux/userSlice';


const App = () => {
  const { socketConnection, setSocketConnection } = useConversation();
  const authUser = useSelector((state) => state.user.authUser);
  const dispatch = useDispatch();


  useEffect(() => {
    if (authUser) {
      const socketConnection = io(process.env.REACT_APP_BACKEND_URL, {
        query: {
          userId: authUser?._id
        }
      });
      setSocketConnection(socketConnection);

      socketConnection.on("getOnlineUsers", (onlineUsers) => {
        dispatch(setOnlineUsers(onlineUsers));
      });

      return () => socketConnection.close();

    } else {
      if (socketConnection) {
        socketConnection.close();
        setSocketConnection(null);
      }
    }
  }, [authUser]);

  return (
    <div className=' h-screen flex justify-center items-center text-white'>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
