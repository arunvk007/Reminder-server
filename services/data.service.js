//importing jwt
const jwt=require("jsonwebtoken")

//importing db to js
const db=require("./db")

// remainders={
//     1000:{user_name:"arun007",name:"arun",password:"arun123",remainder:[]},
//     1001:{user_name:"rahul007",name:"rahul",password:"rahul123",remainder:[]}
// }

const login=(uname,pswd)=>{
    return db.Remainder.findOne({
        uname,
        pswd,
    }).then(res=>{
        console.log(res+'from login server')
        if(res){
            console.log(res+"from if res login")
            currentUser=res.name
            currentUname= uname
            token=jwt.sign(
                {currentUname:uname},"secretsuperkey123"
            )
            console.log(token)
            return{
                status:true,
                message:"Login successfull",
                statusCode:200,
                currentUser,
                currentUname,
                token,
                
            }
        }
        else{
            return{
                status:false,
                message:"Invalid username or password",
                statusCode:400
            }
        }
    })
}

const register=(name,uname,pswd)=>{

    return db.Remainder.findOne({
        uname
    }).then(user=>{
        console.log(user)
        if(user){
            return{
                status:false,
                message:"Username already exists",
                statusCode:404
            }
        }
        else{
            let accnt=new db.Remainder({
                uname,
                name,
                pswd,
                remainder:[]
            })
            accnt.save()
            return{
                status:true,
                message:"registration successfull",
                statusCode:201
            }
        }
    })


}

const addRem=(remevent,remdate,req)=>{
    console.log(req.currentUname +"from addRem server")
    return db.Remainder.findOne({
        uname:req.currentUname
    }).then((res)=>{
        if(res){
            let remainderObject={
                remevent,
                remdate
            }
            res.remainder.push(remainderObject)
            res.save()
            return{
                status:true,
                message:"Remainder added successfully",
                statusCode:200
            }
        }
        else{
            return{
                status:false,
                message:"Cannot be added",
                statusCode:404
            }
        }
    })
}
const getRemainders=(uname)=>{
    return db.Remainder.findOne({
        uname
    }).then((res)=>{
        if(res){
            console.log(res.remainder +"from getremainders server")
            return{
                status:true,
                message:"Success",
                data:res.remainder,
                statusCode:200,
                
            }
        }
        else{
            return{
                status:false,
                message:"failed",
                statusCode:400,
            }
        }
    })
}
const delRemainder=(index,uname)=>{
    return db.Remainder.findOne({
        uname
    }).then((res)=>{
        if(res){
            res.remainder.splice(index,1)
            return{
                status:true,
                message:"Event deleted successfully",
                message:200
            }
        }
        else{
            return{
                status:false,
                message:"Cannot delete",
                statusCode:400
            }
        }
    })
}

module.exports={
    register,
    login,
    addRem,
    getRemainders,
    delRemainder

}