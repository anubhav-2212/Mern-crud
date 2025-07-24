import User from "../models/user.models.js";

export const createUser=async(req,res)=>{
    const{name,email,address}=req.body;
    console.log(name,email,address)
    try {
        const existingUser=await User.findOne({
            email
        })
        console.log(existingUser)
        if(existingUser){
            return res.status(400).json({
                message:"User already exist"
            })

        }
        const newUser=  await User.create({
            name,
            email,
            address
        })
        console.log(newUser)
        
        
        await newUser.save();
        res.status(200).json({
            message:"User Created Successfully",
            user:newUser
        })
        
    } catch (error) {
        res.status(500).json({
            error,
            message:"error creating User"

        })
        
    }
}
export const getAllUser=async(req,res)=>{
    try {
        const AllUser=await User.find();
        if(!AllUser||AllUser.length===0){
            return res.status(400).json({
                message:"error getting all user"
            })
        }
        res.status(201).json({
            user:AllUser
        })
        
    } catch (error) {
          res.status(500).json({
            error,
            message:"error getting all User"

        })
        
    }
}
export const getUserbyId=async(req,res)=>{
    try {
        const id=req.params.id
        console.log(id);
        const userbyId=await User.findById(id)
        console.log(userbyId);
        
        if(!userbyId){
            return  res.status(400).json({
                error,
                message:"User does not exist"

        })
        }
        res.status(200).json({
            message:"got user by id",
            user:userbyId
        })
        
    } catch (error) {
          res.status(500).json({
            error,
            message:"error getting User by id"

        })
        
    }
}
export const updateUserbyId=async(req,res)=>{
    const id=req.params.id;
    try {
        const userExist=await User.findById(id);
        if(!userExist){
            return res.status(400).json({
                message:"user does not exist"
            })
        }

        const updateUser=await User.findByIdAndUpdate(id,req.body,{
            new:true
        })
        res.status(200).json({
            user:updateUser,
            message:"User updated succesfully"
        })
    } catch (error) {
         res.status(500).json({
            error,
            message:"error Updating User"

        })
        
        
    }
}
export const deleteUserbyId=async(req,res)=>{
     const id=req.params.id;
    try {
        const userExist=await User.findById(id);
        if(!userExist){
            return res.status(400).json({
                message:"user does not exist"
            })
        }
        const deleteUser=await User.findByIdAndDelete(id)
        res.status(201).json({
            message:"user deleted succesfully",
            user:deleteUser
        })

}

catch (error) {
         res.status(500).json({
            error,
            message:"error Updating User"

        })
        
        
    }
}

