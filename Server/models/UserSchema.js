const mongoose=require("mongoose");
const user=mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        min:3
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        
    },
    image:{
        type:String
    }
    
})
module.exports=mongoose.model("userSchema",user)