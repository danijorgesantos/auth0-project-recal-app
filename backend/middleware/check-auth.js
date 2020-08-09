const jwt=require('jsonwebtoken');
const app=require('./../server');

module.exports=(req,res,next)=>{
  if (typeof req.headers.authorization !== 'string') {
    console.log("Not a string: Server")
   res.sendStatus(400);
   return;
 }
  try{
    const token=req.headers.authorization.split(" ")[1];
  const decoded=jwt.verify(token,process.env.JWT_KEY);
  req.userData=decoded;
  next();
  return token;
}catch(error){
  return res.status(401).json({
      message:'Auth failed'
  });
app.get('/users/login');
}

};
