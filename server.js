const express =require("express");
const mongoose=require('mongoose');
const cors =require('cors')
const dotenv =require('dotenv')
const authRouter=require('./routes/authUser.js')
const messageRouter=require('./routes/messageRoute.js');
const userRoute=require('./routes/userRoute.js')
const tryroute=require('./routes/try.js')
const cookieParser = require("cookie-parser");
const { server,app } = require("./Socket/socket.js");

dotenv.config()
// const app=express();
// app.use(cors());
app.use(cors({
    origin: 'http://localhost:3000', // Your frontend URL
    credentials: true // Allow credentials (cookies)
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser())

const response=mongoose.connect(process.env.URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true})
if(response)
{
    console.log("Connected to db")
}
else{
    console.log("Not Connected to db")
}


// app.use('/',tryroute)



app.use('/',authRouter)
app.use('/',userRoute)
app.use('/',messageRouter)

app.get('/',(req,res)=>{
    res.send("hello")
})
server.listen(process.env.PORT,()=>{
    console.log("Server started")
})