const logger = require('../logger');
const user = require('../models/user');
const bcrypt = require('bcrypt');

const v1UserSelfGet = async (req,res,next)=>{
  try{
    [username,password]= Buffer.from(req.headers.authorization.split(' ')[1],'base64').toString().split(':');
  }catch{
    logger.warn({
      message: "User did not provide authorization",
      log_type: "authentication"
    });
    return res.setHeader("Cache-Control", "no-cache").status(401).json().end();
  }  
  if(Object.keys(req.body).length!=0){
    return res.setHeader("Cache-Control", "no-cache").status(400).json().end();
  }
  const currentUser = await user.findOne({where:{username:username}});
  if(currentUser && await bcrypt.compare(password,currentUser.password)){
    if (currentUser.is_verified==false){
      logger.warn({
        message: `Email not verified for user ${currentUser.id}. Access Denied to get account details.`,
        log_type: "authentication"
      });
      return res.setHeader("Cache-Control", "no-cache").status(403).json().end();
    }
    res.setHeader("Cache-Control", "no-cache").status(200).json({
      "id": currentUser.id,
      "first_name": currentUser.first_name,
      "last_name": currentUser.last_name,
      "username": currentUser.username,
      "account_created": currentUser.account_created,
      "account_updated": currentUser.account_updated
    }).end()    
  }else{
    res.setHeader("Cache-Control", "no-cache").status(401).json().end();
  }
}
module.exports=v1UserSelfGet;