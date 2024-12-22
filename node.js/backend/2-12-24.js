/*const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// Connect to MongoDB
mongoose
  .connect('mongodb://127.0.0.1:27017/simpleLoginApp', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected!'))
  .catch((err) => console.error(err));

// Create a generic model for MongoDB documents
const User = mongoose.model('User', new mongoose.Schema({}, { strict: false }));

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public')); // Serve static files

// Routes

// POST: Register a new user
app.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }
    const newUser = new User({ username, password });
    await newUser.save();
    res.json({ message: 'User registered successfully!' });
  } catch (err) {
    res.status(400).json({ error: 'Error registering user!' });
  }
});

// POST: Login a user
app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username, password });
    if (user) {
      res.json({ message: 'Login successful!' });
    } else {
      res.status(401).json({ message: 'Invalid username or password' });
    }
  } catch (err) {
    res.status(400).json({ error: 'Error logging in!' });
  }
});

// GET: Retrieve all users (Admin functionality)
app.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching users!' });
  }
});

// Start the server
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);


const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Initialize Express
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose
  .connect("mongodb://127.0.0.1:27017/sdc", {})
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));
const EmployeeSchema=new mongoose.Schema({
  empid:{type:Number,unique:true},
  name:{type:String,required:true},
  email:{type:String,required:true},
  position:{type:String,required:true},
  department:{type:String,required:true},
  salary:{type:String,required:true},
  joindate:{type:Date,required:true}
  });
  const emp = mongoose.model("emp", EmployeeSchema);
  const emp1={empid:"1",name:"sneha",email:"sneha@gmail.com",position:"do",department:"jhhg",salary:"3867637",joindate:"2024-12-12"};
  
  app.get('/',async (req,res)=>{
    const empw=await emp.find();
    res.send(empw);
  })
  app.post('/insert',async (req,res)=>{
    try{
      const{empid,name,email,position,department,salary,joindate}=req.body;
      const ne=new emp({empid,name,email,position,department,salary,joindate});
      await ne.save();
      res.send("succes");

    }catch(err){
      console.log(err);
    }
  })
  app.put('/update/:empid', async (req,res)=>{
    try{
      const{empid}=req.params;
      const{salary}=req.body;
      const up=await emp.findOneAndUpdate(
        {empid},{salary},{new:true}
      );
      
      res.status(200).json({
        message: "Salary updated successfully!",
        emp: up,
      });

      
    }catch(err){
      console.log(err);
    }

  })
  app.delete('/delete/:empid', async (req, res) => {
    const empid = parseInt(req.params.empid, 10); // Convert empid to a number
    if (isNaN(empid)) {
      return res.status(400).json({ error: 'Invalid empid format' });
    }
  
    try {
      const del = await emp.findOneAndDelete({ empid: empid });
      if (del) {
        res.status(200).json({
          message: 'Deleted successfully',
          emp: del,
        });
      } else {
        res.status(404).json({ message: 'Employee not found' });
      }
    } catch (err) {
      res.status(500).json({ error: 'Error deleting employee', details: err });
    }
  });
  
  
  const PORT=3001;
  app.listen(PORT,()=>{
  console.log(`server is running on http://localhost:${PORT}`)});
  */
 
