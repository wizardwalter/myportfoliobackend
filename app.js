const express = require('express');
const mongoose = require('mongoose');
const cors = require ("cors");
const bodyParser = require("body-parser");
const usersRoute = require("./routes/user");
const commentRoute = require("./routes/comment");
require('dotenv').config()



const app = express();
app.use(bodyParser.json());
app.use(cors());
mongoose.connect(process.env.MONGO_URI, () =>{
    console.log('connected to database')
});

app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers",
    "Orgin, X-Requested-With, Content-Type, Accept, authorization"
    );
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS")
    next();
});


app.use("/users", usersRoute);
app.use("/reviews", commentRoute);


app.listen(process.env.PORT|| 3000, ()=>{
    console.log("listening on port 3000")
})