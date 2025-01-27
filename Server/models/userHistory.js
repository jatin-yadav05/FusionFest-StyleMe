const mongoose=require("mongoose");
const userHistory=mongoose.Schema({
    id:{
        type:String
    },
    userImages:{
        type:String,
        value:[]
    }
})
module.exports=mongoose.model("userHistory",userHistory)