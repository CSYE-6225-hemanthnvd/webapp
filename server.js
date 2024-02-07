const express = require('express');
const { healthz } = require('./routes/health');
const { createUser } = require('./routes/createUser');
const { sequelize } = require('./db');
const {userSelf} = require('./routes/userSelf');
 const mysql = require('mysql2/promise');
const user = require('./models/user');
const app = express();
const port = process.env.PORT || 8080;

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
app.listen(port,()=>{
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
  })  
  console.log("Server running on port " + port)
});



    
    