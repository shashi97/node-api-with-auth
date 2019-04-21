const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel=require('./../models/users');

const register=(req,res)=>{
    let userReq=req.body;
    userModel.find({email:userReq.email}).then((data)=>{
        if (data.length>=1) {
            return res.status(422).json({
             message:"User already exsits"
            });
          }else{
            bcrypt.hash(userReq.password,10,(err,hash)=>{
                if (err) {
                  return res.status(500).json({
                        error:{
                          message:err
                        }
                  });
                } else {
                  const user=new userModel({
                    _id:mongoose.Types.ObjectId(),
                    firstName:userReq.firstname,
                    lastName:userReq.firstname,
                    email : userReq.email,
                    password:hash,
                    mobile:userReq.mobile,
                    status:true
                  });
            
                  user.save().then((result)=>{
                    res.status(201).json({
                      message:"User registered successfully.",
                      user:result
                    });
                  }).catch(err=>{
                    res.status(500).json({
                      error:err
                    })
                  });
          }  
        });
    }
    }).catch(err=>{
        res.status(500).json({
          error:err
        })
      });

}
const login=(req,res)=>{
    let userReq=req.body;
    userModel.find({email:userReq.email}).then((data)=>{
            if (data.length<1) {
            return res.status(401).json({
                message:"Authentication failed."
            });
            }
          bcrypt.compare(userReq.password,data[0].password,(err, result)=>{
          if (err) {
            return res.status(401).json({
              message:"Authentication failed"
            });
          }
          if(result) {
              let payload={
                email:data[0].email,
                userId:data[0]._id
              }
         const token=jwt.sign(payload,process.env.JWT_KY,{expiresIn:"2m"});
          return res.status(200).json({
            message:"Authentication has been successfully",
            token:token
           });
          }
        });
      
        }).catch(err=>{
          res.status(500).json({
            error:err
          })
        });
      
}

const deleteuser=(req,res)=>{
  userModel.remove({email:req.params.email}).then((result)=>{
    res.status(200).json({
      message:"User deleted successfully."
    });
    }).catch(err=>{
      res.status(500).json({
        error:err
      })
    });
}

module.exports={
    register:register,
    login:login,
    delete:deleteuser
}

//,
// example:"Authorization : bearer "+token 