const express = require('express');
const user = require('./models/user');
const { healthz } = require('./routes/health');
const { createUser } = require('./routes/createUser');
const {userSelf} = require('./routes/userSelf');
const { sequelize } = require('./db');
const logger = require('./logger');
const { userVerify } = require('./routes/userVerify');

sequelize.sync().then((result)=>{
  // logger.info(result);
}).catch((err)=>{
  logger.error(err);
});
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use((err,req,res,next)=>{
  if(err instanceof SyntaxError && err.status===400 && 'body' in err){
    return res.setHeader("Cache-Control", "no-cache").status(400).json();
  }
})
app.use(healthz);
app.use('/v1',createUser);
app.use('/v1/user',userVerify);
app.use('/v1/user',userSelf);
app.all((req,res,next)=>{
  res.setHeader("Cache-Control", "no-cache").status(404).json().end();
});
module.exports=app;