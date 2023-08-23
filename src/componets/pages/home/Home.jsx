import React from 'react'
import Sidebar from '../sidebar/Sidebar'

import './home.css'
import Videodata from './Videodata'

function Home() {
  return (
    <div className='sectionpages'>
    <section className='container'>
    <section className="sidebarsection">
     <div className="sidebar">
       <Sidebar/>
        </div>
     </section>
    <section className="mainsection">
    <div className="main">
    <Videodata/>
    </div>
    </section>
    </section>
    </div>
  )
}

export default Home
