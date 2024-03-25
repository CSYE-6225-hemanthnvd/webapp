const logger = require("../logger");
const user = require('../models/user');

const v1UserVerify = async (req,res,next)=>{
  const currentUser = await user.findOne({where:{id:req.query.id}});
  if(currentUser){
    if(Date.now() < currentUser.verify_by){
      currentUser.is_verified = true;
      currentUser.save();
      logger.warn({
        message: "User verified successfully",
        log_type: "User Verification",
      });
      return res.setHeader("Cache-Control", "no-cache").status(200).json({message:'Email verified successfully'}).end();
    }else{
      logger.warn({
        message: "User tried to verify with expired link",
        log_type: "User Verification",
      });
      return res.setHeader("Cache-Control", "no-cache").status(410).json({message:'Verification link expired'}).end();
    }
  }else{
    logger.warn({
        message: "Someone tried to verify with wrong userid",
        log_type: "User Verification",
    });
    return res.setHeader("Cache-Control", "no-cache").status(400).json({message:'Invalid user'}).end();
  }
}

module.exports=v1UserVerify;