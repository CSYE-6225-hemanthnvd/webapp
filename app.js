const express = require('express');
const user = require('./models/user');
const { healthz } = require('./routes/health');
const { createUser } = require('./routes/createUser');
const {userSelf} = require('./routes/userSelf');
const mysql = require('mysql2/promise');
const { sequelize } = require('./db');

mysql.createConnection({
    user:'root',        
    password : '123'
  }).then((connection) => {
    connection.query('CREATE DATABASE IF NOT EXISTS assignment01;').then(() => {
      sequelize.sync().then((result)=>{
        // console.log(result);
      }).catch((err)=>{
        console.log(err);
      });
    })
}).catch((err)=>{console.log(err)})

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
app.use('/v1/user',userSelf);
app.all((req,res,next)=>{
  res.setHeader("Cache-Control", "no-cache").status(404).json().end();
});
module.exports=app;