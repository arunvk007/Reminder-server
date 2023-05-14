//import mongoose
const mongoose=require("mongoose")

//connection string
mongoose.connect("mongodb://localhost:27017/remainder_list",{
    useNewUrlParser:true
})

//defining model

const Remainder=mongoose.model('remainders',{
    name:String,
    uname:String,
    pswd:String,
    remainder:[]
})

//exporting

module.exports={
    Remainder
}