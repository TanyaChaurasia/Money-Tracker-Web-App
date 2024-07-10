var express = require("express")
var bodyParser = require("body-parser")
var mongoose = require("mongoose")

const app= express()
app.use(bodyParser.json())
app.use(express.static('public'))
app.use (bodyParser.urlencoded({
    extended: true
}))
mongoose.connect('mongodb://localhost:27017/MoneyList')
var db = mongoose.connection
db.on('error',()=>console.log("error in connecting"))
db.once('open',()=>console.log("connected to database"))

app.post("/add",(req,res)=>{
    var type_select=req.body.type_select
    var name_input=req.body.name_input
    var amount_input=req.body.amount_input
    var date_input=req.body.date_input

    var data={
        "type": type_select,
        "name":name_input,
        "amount":amount_input,
        "date":date_input,
    }
    db.collection('users'),insertOne(data,(err,collection)=>{
        if(err){
            throw err;
            console.log("record inserted successfully")
        }
    })

})

app.get("/",(req,res)=>{
    res.set({
        "Allow-access-Allow-Origin":'*'
    })
    return res.redirect('index.html')
}).listen(5000)

console.log("listening on port 5000")
