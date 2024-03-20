const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors')
app.use(cors())
// const chats = require('./dummyChat');
const connectDB = require('./cofig/DBconnection');

const userRoutes = require('./routes/userRoutes')
const chatRoutes = require('./routes/chatRoutes')
const messageRoute = require('./routes/messageRoutes')

dotenv.config();
connectDB();
app.use(express.json());

app.get("/",(req,res)=>{
    res.send("listining to port");
})
app.use('/api/user',userRoutes);
app.use('/api/chat',chatRoutes);
app.use('/api/message',messageRoute);


app.get("*", (req, res) => {
    res.status(404).json({
        success:false,
        message: "This route does no exist",
    });
  });

const PORT = process.env.PORT;

app.listen(4000,console.log(`Server listining on ${PORT}`));