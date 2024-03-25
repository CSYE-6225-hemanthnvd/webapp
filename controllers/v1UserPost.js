const bcrypt = require('bcrypt');
const user = require('../models/user');
const logger = require('../logger');
const publishMessageWithCustomAttributes = require('../pubsub');

const v1UserPost = async (req,res,next)=>{
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
  const hash = await bcrypt.hash(req.body.password,bcrypt.genSaltSync(10));
  try{
    await user.create({first_name:req.body.first_name,last_name:req.body.last_name,password:hash,username:req.body.username,account_created:new Date().toISOString(),account_updated:new Date().toISOString()});
  }catch(err){
    logger.error({
      message: err.name,
      log_type: "Sequelize"
    });
    return res.setHeader("Cache-Control", "no-cache").status(400).json().end();
  }
  const dataValues = (await user.findOne({where:{username:req.body.username}})).dataValues
  logger.info({
    message: "New user created",
    log_type: "User",
    "id": dataValues.id,
    "first_name": req.body.first_name,
    "last_name": req.body.last_name,
    "account_created": dataValues.account_created
  });
  publishMessageWithCustomAttributes("verify_email",{
    first_name:req.body.first_name,
    last_name:req.body.last_name,
    username:req.body.username,
    id:dataValues.id
  })
  res.setHeader("Cache-Control", "no-cache").status(201).json({
    "id": dataValues.id,
    "first_name": req.body.first_name,
    "last_name": req.body.last_name,
    "username": req.body.username,
    "account_created": dataValues.account_created,
    "account_updated": dataValues.account_updated
  }).end()  
}
module.exports=v1UserPost;