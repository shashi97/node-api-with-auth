const express=require('express');
const bodyParser=require('body-parser')
const mongoose=require('mongoose');
const app=express();
const userRouter=require('./routes/users')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
var cors = require('cors');
app.use(cors());
mongoose.connect('mongodb://localhost:27017/meanstackproject',{
    useNewUrlParser:true
})

app.use('/user',userRouter);

// app.use((req,res,next)=>{
//     const error=new Error('Not Found');
//     error.status=404;
//     next(error);
// });
// app.use((error,req,res,next)=>{
//     res.status(error.status|| 500);
//     res.json({
//         message:error.message,
//         status:false
//     })
// });
module.exports=app;