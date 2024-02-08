const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const user = require('../models/user');

router.post('/user',async (req,res,next)=>{
  if(req.headers.authorization!==undefined){
    return res.setHeader("Cache-Control", "no-cache").status(400).json().end();
  }
  if(Object.keys(req.body).length!==4){
    return res.setHeader("Cache-Control", "no-cache").status(400).json().end();
  }
  for(const key in req.body){
    if(key==='first_name' || key==='last_name' || key==='password' || key==='username'){
      continue;
    }else{
      return res.setHeader("Cache-Control", "no-cache").status(400).json().end();
    }
  }  
  if(await user.findOne({where:{username:req.body.username}})){
    return res.setHeader("Cache-Control", "no-cache").status(400).json().end();
  }
  const hash = await bcrypt.hash(req.body.password,bcrypt.genSaltSync(10));
  try{
    await user.create({first_name:req.body.first_name,last_name:req.body.last_name,password:hash,username:req.body.username,account_created:new Date().toISOString(),account_updated:new Date().toISOString()});
  }catch(err){
    console.log(err);
    return res.setHeader("Cache-Control", "no-cache").status(400).json().end();
  }
  res.setHeader("Cache-Control", "no-cache").status(200).json({
    "id": (await user.findOne({where:{username:req.body.username}})).dataValues.id,
    "first_name": req.body.first_name,
    "last_name": req.body.last_name,
    "username": req.body.username,
    "account_created": (await user.findOne({where:{username:req.body.username}})).dataValues.account_created,
    "account_updated": (await user.findOne({where:{username:req.body.username}})).dataValues.account_updated
  }).end()  
});
exports.createUser = router;