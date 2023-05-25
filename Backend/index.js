const express= require('express');
const dotenv = require('dotenv')
dotenv.config()

const PORT=5000||process.env.PORT;

const app= express()

//handling cors error
app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","http://localhost:3000");
    res.header(
      "Access-Control-Allow-Headers",
      "Original,X-Requested-With,Content-Type,Accept"
    )
    next();
  })
  
app.use(express.json())

app.use('/chat',require('./generate'))

app.listen(PORT,()=>{
    console.log("listening")
})