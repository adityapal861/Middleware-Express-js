const express = require('express')
const app = express()
const port = 3000
app.use(express.static("public"));
//1st middleware..
// app.use((req,res,next)=>{
//     console.log("hi i am 1st middleware");
//     next();
// })
// //2nd middleware
// app.use((res,req,next)=>{
//     console.log(" hi i am 2nd middleware");
//   next();
// })
//API Token as Query String 
app.use('/api',(req,res,next)=>{
    let{token}=req.query
    if(token==="giveaccess"){
        next()
    }
    res.send("Access denied");

})
app.get('/api',(req,res)=>{
    res.send("DATA")
})
//Logger utility middleware
app.use((req,res,next)=>{
    req.time=Date.now();
    console.log(req.method,req.hostname,req.path,req.time);
    next();
})
//specific route middleware
app.use('/random',(req,res,next)=>{
    console.log("I am only for random");
    next();
})

app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.get('/random',(req,res)=>{
    res.send("Hey  this is a random page")
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})