import React from 'react'
import './User.css'
import { useEffect,useState } from 'react'
import axios from "axios";
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const User = () => {
    const[user,setUser]=useState([])
    
    useEffect(()=>{
        const fetchData=async()=>{
        try {
           const response=  await axios.get('http://localhost:8000/api/v1/user/get')
           console.log(response)
           setUser(response.data.user)
           
        

           
            
        } catch (error) {
            console.log('error while fetching the data',error)
            
        }
    }
    fetchData();

    },[])

    const deleteUser=async(userId)=>{
        
        await axios.delete(`http://localhost:8000/api/v1/user/delete/${userId}`)
        .then((res)=>{
            setUser((prevUser)=>
                prevUser.filter((user)=>
                    user._id !== userId  )
            )
            toast.success(res.data.message,{position:"top-right"})
   
        })
        
        .catch((error)=>{
            console.log(error)
        })



    }

  return (
   
    

    <div className="userTable">
       
            <Link to="/add" type="button" className="btn btn-primary">
        Add User <i class="fa-solid fa-user-plus"></i>
      </Link>
      {user.length===0?(
      <div className="div">
        <h3>PLz Add User</h3>

      </div>
     ):(   <table className='table table-bordered'>
            <thead>
                <tr>
                    <th scope="col">S.No.</th>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Address</th>
                    <th scope="col">Actions</th>
                </tr>
            </thead>
            <tbody>
                {user.map((user,index)=>{
                        return(
                             <tr key={user._id}>
                    
                    <td >{index+1}</td>
                    <td >{user.name}</td>
                    <td>{user.email}</td>
                    <td >{user.address}</td>
                    <td className="actionButtons">


                        <Link to={`/update/`+user._id}>  < button type="button" className="btn btn-dark">
                            <i className="fa-solid fa-pen-to-square"></i>

                        </button>
                        </Link>
                        

                        <button type="button" className="btn btn-danger" onClick={()=>deleteUser(user._id)}>
                            <i className="fa-solid fa-trash"></i>
                        </button>
                       </td>
                        
                       
                    
               
               
                </tr>
                 )
                        })}
            </tbody>
        </table>) }
        
     
      
    </div>
   
  )
}

export default User
