const user = require('../models/user');
const bcrypt = require('bcrypt');

const v1UserSelfPut = async (req,res,next)=>{
  [username,password]= Buffer.from(req.headers.authorization.split(' ')[1],'base64').toString().split(':');
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
    res.setHeader("Cache-Control", "no-cache").status(200).json().end();
  }else{
    res.setHeader("Cache-Control", "no-cache").status(401).json().end();
  }
}
module.exports=v1UserSelfPut;