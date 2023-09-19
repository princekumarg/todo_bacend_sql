const { urlencoded } = require("express");
const express = require("express");
const { connectDB } = require("./config/db");
const app = express()
const todoRotue = require("./routes/todoRoute");

const PORT = 3080;


connectDB()
//middlewares
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use("/api", todoRotue)

app.listen(PORT, ()=>{
    console.log("server is running at PORT=", PORT)
})