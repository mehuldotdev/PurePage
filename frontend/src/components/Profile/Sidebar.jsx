import React from 'react'
import { useUserStore } from '../../../store/userStore'

function Sidebar() {
    const {user} = useUserStore();
  return (
    <div className='bg-primary px-4 py-2 rounded-lg'>
        {
            user? (
                <>
                <h2>{user.name}</h2>
                <p>{user.email}</p>
                </>
            ) : (
                <p>No user found</p>
            )
        }
    </div>
  )
}

export default Sidebar