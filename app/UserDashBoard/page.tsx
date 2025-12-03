import ComplaintForm from '@/components/UserDashboard/ComplaintForm'
import ComplaintList from '@/components/UserDashboard/ComplaintList'
import Navbar from '@/components/UserDashboard/Navbar'
import React from 'react'

const page = () => {
  return (
    <div>
      <Navbar/>
      <ComplaintForm/>
      <ComplaintList/>
    </div>
  )
}

export default page
