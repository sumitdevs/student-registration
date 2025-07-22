import express from "express";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const port = process.env.PORT;

app.get('/',(req,res)=>{
    res.status(200).json({"message":"hello world"});
});

app.listen(port,()=>{
    console.log(`server started at http://localhost:${port}`);
});
