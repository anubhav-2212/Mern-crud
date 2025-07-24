import express from "express";
import { createUser, deleteUserbyId, getAllUser, getUserbyId, updateUserbyId } from "../controllers/user.controllers.js";
const route=express.Router();


route.post('/create',createUser)
route.get('/get',getAllUser)
route.get('/get/:id',getUserbyId)
route.put('/update/:id',updateUserbyId)
route.delete('/delete/:id',deleteUserbyId)

export default route;