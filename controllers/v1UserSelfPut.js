const logger = require('../logger');
const user = require('../models/user');
const bcrypt = require('bcrypt');

const v1UserSelfPut = async (req,res,next)=>{
  try{
    [username,password]= Buffer.from(req.headers.authorization.split(' ')[1],'base64').toString().split(':');
  }catch(err){
    logger.warn({
      message: "User did not provide authorization",
      log_type: "authentication"
  });
    return res.setHeader("Cache-Control", "no-cache").status(401).json().end();
  }  
  const currentUser = await user.findOne({where:{username:username}});
  if(currentUser && await bcrypt.compare(password,currentUser.password)){
    if(Object.keys(req.body).length===0){
      return res.setHeader("Cache-Control", "no-cache").status(400).json().end();
    }
    for(const key in req.body){
      if(key==='first_name' || key==='last_name' || key==='password'){
        continue;
      }else{
        return res.setHeader("Cache-Control", "no-cache").status(400).json().end();
      }
    }
    for(const key in req.body){
      if(key==="password"){
        currentUser[key]=await bcrypt.hash(req.body.password,bcrypt.genSaltSync(10));
        continue;
      }
      currentUser[key]=req.body[key];
    }
    currentUser.account_updated=new Date().toISOString();
    currentUser.save();
    logger.info({
      message: "User updated",
      log_type: "User"
  });
    res.setHeader("Cache-Control", "no-cache").status(204).json().end();
  }else{
    res.setHeader("Cache-Control", "no-cache").status(401).json().end();
  }
}
module.exports=v1UserSelfPut;