import React from 'react'
import Caption from './Caption'
import Projects from './Projects'

export default function Home() {
  return (
    <>
    <div className='container my-5'>
        <Caption/>
    </div>
    <div className="container mt-5">
        <Projects/>
    </div>
    </>
  )
}
