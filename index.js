const express = require("express");
const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 3000;

app.use(express.json());

// import routes
const blog =require("./routes/blog");
// // mount
app.use("/api/v1",blog);

// connect to db
const connectWithDB = require("./config/database");
connectWithDB();

// start the server
app.listen(PORT,()=>{
    console.log(`Running at PORT no ${PORT}`)
}
);

// default route
app.get("/",(req,res)=>{
    res.send(`<h1>This is my homepage<h1/>`)
})