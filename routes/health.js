const express = require('express');
const router = express.Router();
const {connectToDb} = require('../db');

router.head('/healthz',(req,res,next)=>{
  res.setHeader("Cache-Control", "no-cache").status(405).json().end();
})
router.get('/healthz',async (req, res, next)=>{
  if(Object.keys(req.query).length!=0){
    res.setHeader("Cache-Control", "no-cache").status(400).json().end();
    return;
  }
  if(Object.keys(req.body).length!=0){
    res.setHeader("Cache-Control", "no-cache").status(400).json().end();
    return;
  }
  const temp = await connectToDb();
  if(temp){
    res.setHeader("Cache-Control", "no-cache").status(200).json().end();
  }else{
    res.setHeader("Cache-Control", "no-cache").status(503).json().end();
  }
})
router.use('/healthz',(req,res,next)=>{
  res.setHeader("Cache-Control", "no-cache").status(405).json().end();
})
exports.healthz = router;