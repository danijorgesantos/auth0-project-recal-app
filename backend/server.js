const express=require('express');
const app=express();
const cors=require('cors');
const bodyParser = require("body-parser");
const mongoose=require('mongoose');
const compression=require('compression');
const path=require('path');
const http=require('http').createServer(app);
const io=require('socket.io')(http);
const jwt=require('jsonwebtoken');
const checkAuth=require('./middleware/check-auth');
const socketioJwt=require('socketio-jwt');
const mongoClient = require('mongodb').MongoClient;
require('dotenv').config();
const PORT=process.env.PORT||3000

//import external Routes
const userRoutes=require('./routes/users');

//import user model for updates in the socket
//get the user model schema
const User=require('./models/user');

//add middleware
//app.use(compression)
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true})); // to support URL-encoded bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));


const uri = process.env.DB_URI;

mongoose.connect(uri,{useCreateIndex: true,
  useNewUrlParser: true,useUnifiedTopology: true}
);
//DB connection
const connection=mongoose.connection;
connection.once('open',()=>{
  console.log("Database Connection has been established successfully!")
})



//create random namespace
function getRandomCode(min=1000,max=9999){
  return Math.floor(Math.random() * (max - min) + min);
}

//api test route
app.get('/',(req,res)=>{
  res.sendFile(path.join(__dirname+'/test.html'))
});

//route to access user data
app.use('/users',userRoutes);

//route for the collection key
app.get('/ccode',checkAuth,async function (req,res){
  var code= `${getRandomCode()}`;
  console.log(`${code}`);
  res.send(`${code}`);
  try{
    await creatNameSpace(code,true)
  }
  catch{
    console.log(err)
    res.send(err)
  }

});

//route for the return key
app.get('/rcode',checkAuth,async (req,res)=>{
  var code= `${getRandomCode()}`;
  console.log(`${code}`);
  res.send(`${code}`);
  try{
    await creatNameSpace(code,false)
  }
  catch{
    console.log(err)
    res.send(err)
  }
});

//create new namespace

function creatNameSpace(code,isCollection){
 var ccode= code;

 var cname_space=io.of(`${ccode}`); //""+`${ccode}`
 cname_space.on('connection',socketioJwt.authorize({
   secret:process.env.JWT_KEY,
   timeout:5000
 })).on('authenticated',function(socket){
   console.log(`Device connected on ns: ${ccode}`);
   cname_space.emit('hi');
   connectedSockets=Object.keys(cname_space.sockets);
   connectedSocketsLength=connectedSockets.length;
   console.log(connectedSocketsLength)
    socket.send(`code ${ccode} accepted`);

    //check if both admin and client are connected
    //disconnect all clients and delete the namespace
    connectedSockets.forEach(socketId => {
    cname_space.connected[socketId].disconnect(); // Disconnect Each socket
    });
    //cname_space.removeAllListeners(); // Remove all Listeners for the event emitter
    delete io.nsps[`${ccode}`]; // Remove from the server namespaces

    //update staion database
    updateStationTransaction(isCollection);
    //update user account
    updateUserTransaction(isCollection)

 });
}

/**
//test work space
var testcode="1234";

var cname_space=io.of(`${testcode}`); //""+`${ccode}`
cname_space.on('connection', function(socket){
  console.log(`Device connected on ns: ${testcode}`);
  cname_space.emit('hi',{message:'connection set up'});
  connectedSockets=Object.keys(cname_space.sockets);
  connectedSocketsLength=connectedSockets.length;
  console.log(connectedSocketsLength)
  socket.send('Confirmation message from server');

   //check if both admin and client are connected
   //disconnect all clients and delete the namespace
   if(connectedSocketsLength>=2){
     console.log('Max connection reached. Updating data and closing ')
     connectedSockets.forEach(socketId => {
     cname_space.connected[socketId].disconnect(); // Disconnect Each socket
    });
    //cname_space.removeAllListeners(); // Remove all Listeners for the event emitter
    delete io.nsps[`${testcode}`]; // Remove from the server namespaces
    }

})**/



/*io.on('connection', function(socket){
  console.log('Device connected');
  io.emit('You are connected for collection');
})*/
//socket.io namespace for the collection


//function for updating the user model with new transaction
function updateUserTransaction(isCollection){
 if(isCollection){
   User.findOneAndUpdate({ _id: res._id }, { $inc: { collected: 1 } }, {new: true },function(err, response) {
     if (err) {
       callback(err);
     } else {
       callback(response);
     }
   });
 }else{
   User.findOneAndUpdate({ _id: res._id }, { $inc: { returned: 1 } }, {new: true },function(err, response) {
     if (err) {
       callback(err);
     } else {
       callback(response);
     }
   });
 }
}
//function for updating the station model with new transaction
function updateStationTransaction(isCollection){

}



http.listen(PORT,()=>{
  console.log(`Server started on port: ${PORT}` );
})

module.exports=app;
