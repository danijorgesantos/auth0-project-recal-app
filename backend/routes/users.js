const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const checkAuth=require('../middleware/check-auth');
const http=require("http");
var url  = require('url');


//get the user model schema
const User=require('../models/user');

//get the list of all the users in the database
//this is initially
router.get('/',(req,res,next)=>{
  var url_parts = req.protocol + '://' + req.get('host') + req.originalUrl;
  console.log(url_parts);
  console.log("Connected to get all route")
  User.find().select('username email _id points collected returned').exec().then(docs=>{
      console.log(docs);
      const response={
        count:docs.length,
        users:docs.map(doc=>{
          return{
            username:doc.username,
            email:doc.email,
            points:doc.points,
            collected:doc.collected,
            returned:doc.returned,
            _id:doc._id,
            requests:{
              type:'GET',
              url:encodeURI(`${url_parts}`+doc._id)
            }
          }
        })
      };
      if(docs.length >=0){
        res.status(200).json(response);
      }else{
        res.status(404).json({
          message:'No entries found'
        });
      }

    })
    .catch(err=>{
      console.log(err);
      res.status(500).json({
        error:err
      });
    });
});

router.get('/:userId',checkAuth,(req,res,next)=>{
  var url_parts = req.protocol + '://' + req.get('host') + req.originalUrl;
  const id=req.params.userId;
  User.findById(id)
  .select('username _id email points collected returned')
  .exec()
  .then(doc=>{
    console.log("From Database",doc);
    if(doc){
    res.status(200).json({
      user:doc,
      request:{
        type:'GET',
        description:'Get all users',
        url:encodeURI(`${url_parts}`)
      }
    });
  }else{
    res.status(404).json({
      message:"no valid id found"
    })
  }
  })
  .catch(err=>{
    console.log(err);
    res.status(500).json({error:err});
  });
});


//update for auth0
router.post('/signup',(req,res,next)=>{

  const { errors, isValid } = validateRegisterInput(req.body);

// Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }


  User.find({email:req.body.email})
    .exec()
    .then(user=>{
        if(user.length>=1){
          return res.status(409).json({
            message:'email already in use'
          });
        }else{
          bcrypt.hash(req.body.password,10,(err,hash)=>{
            if(err){
              return res.status(500).json({
                message:'Hashing error',
                error:err
              });
            }else{
              const user=new User({
                _id:new mongoose.Types.ObjectId(),
                email:req.body.email,
                password:hash,
                username:req.body.username,
              });
              user.save()
              .then(result=>{
                console.log(result);
                res.status(201).json({
                  message:'User created'
                });
              })
              .catch(err=>{
                console.log(err);
                res.status(500).json({
                  error:err
                })
              });
            }
          });
        }
    })
    .catch(err=>{
      console.log(err);
      res.status(500).json({
        error:err
      })
    });
});

//update for auth0
router.post('/login',(req,res,next)=>{
  // Form validation
console.log("This is form content:"+(req.body.email));
const { errors, isValid } = validateLoginInput(req.body);

// Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.find({email:req.body.email})
    .exec()
    .then(user=>{
      if(user.length<1){
        return res.status(401).json({
          message:'Auth Failed'
        });
      }
      else{
        bcrypt.compare(req.body.password,user[0].password,(err,result)=>{
          if(err){
            return res.status(401).json({
              message:'Auth Failed'
            });
            return res.send('accounts/login');
          }
          if(result){
            const payload = {
              username: user[0].username,
              userId: user[0]._id
            };
              const token=jwt.sign({

                username:user[0].username,
                userId:user[0]._id
              },
              process.env.JWT_KEY,
        
            {
              expiresIn:'72h'
            },
          );
              return res.status(200).json({
                message:'Auth successful',
                token:token
              });
          }
          else{
            return res.status(401).json({
              message:'Auth failed'
            });
          }
        });
      }
    })
    .catch(err=>{
      console.log(err);
      res.status(500).json({
        error:err
      })
    });
});

router.patch('/:userId',checkAuth,(req,res,next)=>{
  const id=req.params.userId;
  let fileID;
  console.log("Patching")

  const updateOps={};
  for(const ops of Object.keys(req.body)){
    updateOps[ops.propName]=ops.value;
  }
  User.update({_id:id},{$set:updateOps}).exec().then(result=>{
    console.log(result);
    res.status(200).json({
      message:'User updated',
      request:{
        type:'GET',
        url:encodeURI(`${eval(url)}` +id)
      }
    });
  })
  .catch(err=>{
    console.log(err);
    res.status(500).json({
      error:err
    });
  });
});

router.delete('/:userId',checkAuth,(req,res,next)=>{
  User.remove({_id:req.params.id})
  .exec()
  .then(result=>{
    res.status(200).json({
        message:'User deleted'
    });
  })
  .catch(err=>{
    console.log(err);
    res.status(500).json({
      error:err
    })
  });
});

module.exports=router;
