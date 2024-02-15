const methodNotAllowed =(req,res,next)=>{
  return res.setHeader("Cache-Control", "no-cache").status(405).json().end();
}
module.exports= methodNotAllowed;