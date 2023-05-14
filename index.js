//importing express framework
const express = require("express")
const jwt = require("jsonwebtoken")

//importing cors library
const cors = require("cors")

const dataservice = require("./services/data.service")

//creating server app
const app = express()

app.use(cors({
    origin: "http://localhost:4200"
}))

//to parse json to js

app.use(express.json())

const appMiddleware = (req, res, next) => {
    try {
        token = req.headers["x-access-token"]
        // console.log(token + "from middleware")
        result = jwt.verify(token, "secretsuperkey123")
        req.currentUname = result.currentUname
        console.log(result + "from middleware")
        next()
    }
    catch {
        res.status(400).json({
            status: false,
            message: "Invalid user...Please Login",
            statusCode: 400
        })
    }
}

//Register API
app.post('/reg', (req, res) => {
    const result = dataservice.register(req.body.name, req.body.uname, req.body.pswd)

    result.then(resobj => {
        res.status(resobj.statusCode).send(resobj)
    })
})

//Login API
app.post('/log', (req, res) => {
    console.log("log hit")
    const result = dataservice.login(req.body.uname, req.body.pswd)

    result.then(resobj => {
        res.status(resobj.statusCode).send(resobj)
    })
})

//Addrem api
app.post('/addrem', appMiddleware, (req, res) => {
    console.log("add remainder hit")
    const result = dataservice.addRem(req.body.remevent, req.body.remdate, req)
    console.log(result +"addrem api")
    result.then(resobj => {
        res.status(resobj.statusCode).send(resobj)
    })
})
//getrem api
app.post('/getrem',appMiddleware,(req,res)=>{
    const result=dataservice.getRemainders(req.body.uname)
    result.then(resobj => {
        res.status(resobj.statusCode).send(resobj)
    })
})
//delrem api
app.post('/delrem',appMiddleware,(req,res)=>{
    const result = dataservice.delRemainder(req.body.index,req.body.uname)
    result.then(resobj => {
        res.status(resobj.statusCode).send(resobj)
    })
})


//configuring port number for server app
app.listen(3000, () => {
    console.log("server running on port 3000")
})