import React from 'react'
import { useSelector } from 'react-redux'

function Dashboard() {
  const {user} = useSelector(state=>state.authReducer);
  return (
    <div className='container'>
      <h1 className='text-center'>Wellcome {user.email}</h1>
    </div>
  )
}

export default Dashboard
