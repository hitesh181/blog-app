//import {db} from "../db.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import multer from "multer";
import User from "../models/Users.js"

export const register = async (req, res)=>{

  console.log("at register route")
  const {username, password, img} = req.body
  
  console.log(req.body)
    //check if user already exists
    //CHECK EXISTING USER

    const userFound = await User.findOne({username:username})
    console.log(userFound)
    if(userFound)
      return res.status(403).json("User already exists ")

    try{
      const newUser = await User.create({
        username,
        password: bcrypt.hashSync(password, 10),
        img
      })
      if(newUser){
        console.log({msg:"User Created Successfully ", newUser})
        return res.status(200).json(newUser)
      }
    }
    catch(err){
      console.log("error occured ", err)
      return res.status(400).json(err)
    }
};


export const login = async (req, res)=>{
    console.log("AT login ")
    console.log(req.body)

    try{
      const userFound = await User.findOne({username:req.body.username})
      if(!userFound)
        return res.status(404).json("User not Found ")
      
      console.log("userFound is ", userFound)
      const loggedIn = bcrypt.compareSync(req.body.password, userFound.password )


      if(loggedIn){
        const token = jwt.sign({id: userFound._id}, "jwtkey")
        console.log("token is ", token)

        res.cookie("access_token", token,{
          httpOnly:true
        }).status(200).json(userFound)

        console.log("cookie created ")    
      }
      else
        return res.status(400).json("wrong Credentials ")
    }
    catch(err){
      return res.status(400).json("Error Occured ", err)
    }
}

export const logout = (req, res)=>{
    console.log("Req cookie is ", req.cookie)
    res.clearCookie("access_token", {
      httpOnly:true,
      sameSite: 'None',
      path: '/'
    }).status(200).json("User has been logged out")
}