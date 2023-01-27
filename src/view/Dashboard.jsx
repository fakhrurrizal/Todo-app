import React from 'react'
import DashboardEmpty from '../components/DashboardEmpty'
import AddHeader from '../components/Headers/AddHeader'
import ListActivity from '../components/ListActivity'

function Dashboard() {
  return (
    <div className=' m-auto lg:px-36 py-10 '>
      <AddHeader />
      {/* <DashboardEmpty /> */}
      <ListActivity />
    </div>
  )
}

export default Dashboard