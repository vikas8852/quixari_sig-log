const express=require('express');
const connectDB = require('./db/config.js');
const User=require('./db/Schema.js');
const app=express();
const port=5000;

connectDB()
.then(() => {
    app.listen(port ,() => {
        console.log(`Server is running at port : ${port}`);
    })
})
.catch((err) => {
    console.error(`MONGODB connection Failed ${err}`);
})

app.use(express.json());
app.post("/register",async(req,res)=>{
    try {
    const user = new User(req.body); // Make sure User is imported correctly
       let result= await user.save();
       result=result.toObject();
       delete result.password;   //deleting password from display
       res.send(result);

    //    res.status(201).send('User created');
      } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
      }
})
app.post("/login",async(req,res)=>{
   // console.log(req.body);
   if(req.body.email && req.body.password){
    let user=await User.findOne(req.body).select("-password");
    if(user)
     res.send(user);
    else{
        res.send({result:'NO User found'})
    }
}
else{
    res.send({result:'enter email and password'})
}
   

})


