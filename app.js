import express from "express";
import connectDB from "./config/db.config.js";
import dotenv from "dotenv";
import studentRouter from "./routes/student.routes.js";
dotenv.config();

const app = express();
const port = process.env.PORT;

connectDB();

app.set('viw engine','ejs');

app.use(express.urlencoded({extended:false}));
app.use(express.static('public'));
app.use((req, res, next) => {
  res.locals.currentPath = req.path;
  next();
});

app.use('/students',studentRouter);
app.get('/',(req,res)=>{
    res.status(200).render('index.ejs',{
        title:'StudentEse'
    })
});

app.use((req, res) => {
  res.status(404).render('notfound.ejs',{
    title:'page not found'
  });
});

app.listen(port,()=>{
    console.log(`server started at http://localhost:${port}`);
});
