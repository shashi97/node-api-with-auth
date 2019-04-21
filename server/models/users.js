const mongoose = require('mongoose');
const userSchema=mongoose.Schema({
  _id:mongoose.Schema.Types.ObjectId,
  email:{type:String, required:true, unique :true},
  password:{type:String, required:true},
  firstName:{ type:String, required:true},
  lastName:{ type:String, required:true},
  mobile:{ type:String, required:true},
  status:{type:Boolean}
});
module.exports=mongoose.model('users',userSchema);