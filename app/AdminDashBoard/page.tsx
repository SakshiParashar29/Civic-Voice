import ComplaintList from '@/components/AdmindashBoard/ComplaintList'
import Profile from '@/components/AdmindashBoard/Profile'
import Navbar from '@/components/UserDashboard/Navbar'
import React from 'react'

const page = () => {
  return (
    <div>
      <Navbar/>
      <Profile/>
      <ComplaintList/>
    </div>
  )
}

export default page
