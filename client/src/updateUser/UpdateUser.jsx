import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';
import toast from 'react-hot-toast';
const UpdateUser = () => {
  const User={
    name:"",
    email:"",
    address:""
  }


  const[user,setUser]=useState(User);
  const {id}=useParams();
  const navigate=useNavigate();
  useEffect(()=>{
    const fetchData=async()=>{
    await axios.get(`http://localhost:8000/api/v1/user/get/${id}`)
    .then((response)=>{
      setUser(response.data.user)
    })
    .catch((error)=>{
      console.log(error)
    })
  }
      fetchData();
    },[id])
    const inputHandler=(e)=>{
      const{name,value}=e.target
      console.log(name,value)
      setUser({...user,[name]:value})
    }
    const submitForm=async(e)=>{
      e.preventDefault()
      await
      axios.put(`http://localhost:8000/api/v1/user/update/${id}`,user)
      .then((response)=>{
        toast.success(response.data.message,{position:'top-right'})
        navigate('/')
      })
      .catch((error)=>{
        console.log(error)
      })
    }



  
  return (
    <div>
      <div className='container'>
     <Link to ="/"><button className='top-left-button'> <i className="fa-solid fa-backward"></i> Back</button>
     </Link>
      <h1 className="heading" >Update User Form</h1>

      <form action="submit" onSubmit={submitForm} >
        <div className="input-group">
          <label className="label-field" htmlFor="name">Name:</label>
          <input className="input-field" type="text"
                  id="name"
                  name="name"
                  value={user.name||""}
                  
                  onChange={inputHandler}
                  
                  autoComplete='off'
                  placeholder=' Enter your name'
                   />
        </div>
        <div className="input-group">
          <label className="label-field" htmlFor="email">Email:</label>
          <input className="input-field"  type="text"
                  id="email"
                  name="email"
                  value={user.email||""}
                   onChange={inputHandler}
                  
                  
                  autoComplete='off'
                  placeholder='Enter your Email'
                   />
        </div>
        <div className="input-group">
          <label className="label-field"  htmlFor="address">Address:</label>
          <input className="input-field"   type="text"
                  id="address"
                  name="address"
                  value={user.address||""}
                   onChange={inputHandler}
                 
                  autoComplete='off'
                  placeholder='Enter your address'
                   />
        </div>
        <button type="submit"  className='submit-btn'>Submit</button>
        
      </form>
      

    </div>
    </div>
  )
}

export default UpdateUser
