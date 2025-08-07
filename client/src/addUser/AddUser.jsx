import React from 'react'
import "./adduser.css"
import { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import axios from 'axios'
import {toast} from 'react-hot-toast';


import { useNavigate } from 'react-router-dom'

const AddUser = () => {
  const Users={
    name:"",
    email:"",
    address:""
  }
  const[user,setUser]=useState(Users)
  const navigate=useNavigate();
  const inputHandler=(e)=>{
    const{name,value}=e.target;
    console.log(value,name)
    setUser({...user,[name]:value})
  }

  const submitHandler=async(e)=>{
    e.preventDefault()
    console.log("submitting",user)
    
 
      await axios.post("http://localhost:8000/api/v1/user/create",user)
      .then((response)=>{
        toast(response.data.message,{position:'top-right'})
        // window.alert(response.data.message);

        
  navigate("/");

      
      })
      .catch((error)=>{
       const message = error.response?.data?.message || "Something went wrong";
       toast.error(message, { position: "top-right" });
      })
      
     

    
  }



  return (
    <div className='container'>
     <Link to ="/"><button className='top-left-button'> <i className="fa-solid fa-backward"></i> Back</button>
     </Link>
      <h1 className="heading" >Add User Form</h1>

      <form action="submit" onSubmit={submitHandler}>
        <div className="input-group">
          <label className="label-field" htmlFor="name">Name:</label>
          <input className="input-field" type="text"
                  id="name"
                  name="name"
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
                  onChange={inputHandler}
                  autoComplete='off'
                  placeholder='Enter your address'
                   />
        </div>
        <button type="submit"  className='submit-btn'>Submit</button>
        
      </form>
      

    </div>
  )
}

export default AddUser
