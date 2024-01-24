import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Uploadsuccess() {
  const navigate = useNavigate();
  const handleup=()=>{
    navigate("/projectUpload")
  }
  const handleview=()=>{
    navigate("/viewProjects")
  }
  return (
    <div className='container-md my-5'>
        <div className="container" style={{marginTop:"6rem"}}>
            <h1>Upload Successful!</h1>
            <p>Your Project has been successfully uploaded to the server.</p>
            <div className="container my-5">
            <button type="button" class="btn btn-primary" onClick={handleup} >Upload another project</button>
            <button type="button" class="btn btn-primary mx-5" onClick={handleview} >View project list</button>
            </div>
        </div>
    </div>
  )
}
