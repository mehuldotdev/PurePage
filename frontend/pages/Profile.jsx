import React, { useEffect } from 'react'
import Sidebar from '../src/components/Profile/Sidebar.jsx'
import { Outlet } from 'react-router-dom'
import { useUserStore } from '../store/userStore.js'
import { Slab } from 'react-loading-indicators'

function Profile() {
  
  const {user, loading, error, fetchUser} = useUserStore();

  useEffect(()=> {
    const token = localStorage.getItem('token')
    console.log(token);
    
    if(token){
      fetchUser(token)
    }
    fetchUser()
  }, [fetchUser])

  if (loading) return (
    <div className='h-[100vh] bg-secondary/50 flex items-center justify-center'>
      <Slab text='loading...' color={["#ccc331"]} style={{ fontSize: "24px" }} />
    </div>
  );

  if(error){
    return <div>Error: {error}</div>
  }

  return (
    <div className='text-white h-screen bg-secondary/50 flex flex-col md:flex-row px-2 md:px-12 py-4 md:py-12 w-full'>
      <div>
        <Sidebar className='w-2/6' />
      </div>
      <div>
        <Outlet className='w-5/6' />
      </div>
    </div>
  )
}

export default Profile