const {connectToDb} = require('../db');

const healthzGet = async (req, res, next)=>{
  if(Object.keys(req.query).length!==0){
    return res.setHeader("Cache-Control", "no-cache").status(400).json().end();
  }
  if(Object.keys(req.body).length!==0){
    return res.setHeader("Cache-Control", "no-cache").status(400).json().end();
  }
  const temp = await connectToDb();
  if(temp){
    return res.setHeader("Cache-Control", "no-cache").status(200).json().end();
  }else{
    return res.setHeader("Cache-Control", "no-cache").status(503).json().end();
  }
}
module.exports=healthzGet;