const app = require('./app');
const { sequelize } = require('./db');
const mysql = require('mysql2/promise');
const user = require('./models/user');
const port = process.env.PORT || 8080;

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






    
    