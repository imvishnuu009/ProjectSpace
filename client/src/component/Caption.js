import React from 'react'

export default function Caption() {
    let mystyles={
         height:"40vw",  
        backgroundColor:"#86A7FC",
        display:"flex",
        justifyContent:"center" ,
        alignItems:"center",
    }
  return (
    <div className='container' style={mystyles}>
        <h1>LEARN.EXPLORE.EVOLVE.</h1>
    </div>
  )
}
