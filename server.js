const app = require('./app');
const user = require('./models/user');
const port = process.env.PORT || 8080;

app.listen(port,()=>{ 
  console.log("Server running on port " + port)
});