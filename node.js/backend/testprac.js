

import express from 'express';
import mongoose from'mongoose';
const app=express();
app.use(express.json());
mongoose.connect('mongodb://127.0.0.1:27017/prac',{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>console.log("connected"))
.catch(err=>console.log("no"));
const schema=new mongoose.Schema({
   /* username:{type:String,unique:true},
    email:{type:String,match:/^[^\s@]+@[^\s@]+.[^\s@]+$/},
    password:{type:String,minlength:8}
    */
   bookid:Number,
   title:String,
   author:String,
   genre:String,
   publicationdate:Date,
   availablecopies:Number

})
const users=await mongoose.model('users',schema);
app.get('/',(req,res)=>{
    res.send("welcome guys");
})
app.get('/emps',async(req,res)=>{
    const a=await users.find();
    res.send(a);
})
app.post('/emps',async(req,res)=>{
    const empl=new users(req.body);
    await empl.save();
    res.send("updated");
})
app.put('/emps',async(req,res)=>{
    const{bookid}=req.params;
    const{genre}=req.body;
    const newb=await newb.findOneAndUpdate({bookid:bookid},{genre:genre},{new:true});
    res.json({message:"succes",users:newb});
})
app.get('/emps',async(req,res)=>{
    const re=await users.findManyAndDelete({publicationdate:{$lt:'2000-01-01'}});
    res.json({message:"deleted"});

})
const port=3000;
app.listen(port,()=>{
    console.log(`server is running on http://localhost:${port}`);

})

/*const express = require('express');
const app=express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
app.use(bodyParser.json());

//connnecting to mongodb
mongoose.connect('mongodb://0.0.0.0:27017/bookDB', {useNewUrlParser: true,
    useUnifiedTopology: true})
.then(()=> console.log("Connected to mongodb"))
.catch(err=> console.log("Connection failed: ",err));

//defining schema and model
const bookSchema = new mongoose.Schema({
    title: String,
    author: String,
    jonour: String,
    price: Number,
    publication_date: String
});
const book = mongoose.model('book',bookSchema);
app.get('/',(req,res)=>{
    res.send('Welcome to the Book Management System');
});

//get to fetch all books
app.get('/books', async(req,res)=>{
    const books = await book.find();
    res.json(books);
})

//post to add a new book to db
app.post('/books', async(req,res)=>{
    const newbook = new book(req.body);
    await newbook.save();
    res.json({message: 'Book added successfully', book: newbook});
})

//update price of book using id
app.put('/books/:Title', async(req,res)=>{
    const {Title} = req.params;
    const {price} = req.body;
    const updatedbook = await book.findOneAndUpdate(
        {title: Title},
        {price: price},
        {new: true}
    );
    res.json({message: 'Book updated successfully', book: updatedbook});
})

//delete the book
app.delete('/books/:Title', async(req,res)=>{
    const {Title} = req.params;
    await book.findOneAndDelete({title: Title});
    res.json({message: 'Employee deleted successfully'});
})

//Starting server
const port = 5000;
app.listen(port,()=>{
    console.log(`Server is running on http://localhost:${port}`);
})
const express=require('express');
const mongoose=require('mongoose');
const app=express();
app.use(express.json());
mongoose.connect("mongodb://127.0.0.1:27017/newDB",{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>console.log("connected"))
.catch(err=>console.log("not"));
const schema=new mongoose.Schema({
    title:String,
    author:String,
    jonour:String,
    price:Number,
    publicationdate:String,
});
const book=new mongoose.model('book',schema);
app.get('/',(req,res)=>{
    res.send("welcome to book store");
})
app.get('/books',async(req,res)=>{
    const a=await book.find({title:"sneha"});
    res.send(a);
})
app.post('/books',async (req,res)=>{
    const a=new book(req.body);
    await a.save();
    res.json({message:"success",book:a});
})
app.put('/books/:title',async(req,res)=>{
    const{title}=req.params;
    const{price}=req.body;
    const newbok=await book.findOneAndUpdate({title:title},{price:price},{new:true});
    res.json({message:"succeess updated",book:newbok});

})
app.delete('/books/:title',async(req,res)=>{
    const{title}=req.params;
    await book.findOneAndDelete({title:title});
    res.json({message:"deleted"})
})
const port=3000;
app.listen(port,()=>{
    console.log(`server is running on http://localhost:${port}`);
})

const mongoose=require('mongoose');
const express=require('express');
const app=express();
app.use(express.json());
mongoose.connect('mongodb://127.0.0.1:27017/test',{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>console.log("connected"))
.catch(err=>console.log(err));
const schema=new mongoose.Schema({
    empid:{type:Number,unique:true},
    name:String,
    position:String,
    department:String,
    email:String,
    salary:Number,
    joindate:String
})
const emp=new mongoose.model('emp',schema);
app.get('/',async(req,res)=>{
    res.json({message:"welcome"});
})
app.get('/empl',async(req,res)=>{
    const a=await emp.find();
    res.send(a);

})
app.post('/empl',async(req,res)=>{
    const b=new emp(req.body);
    await b.save();
    res.json({message:"added successfully",emp:b});
})
app.put('/empl/:empid',async(req,res)=>{
    const{empid}=req.params;
    const{salary}=req.body;
    const c=await emp.findOneAndUpdate({empid:empid},{salary:salary},{new:true});
    res.json({message:"updated",emp:c});
})
app.delete('/empl/:empid',async(req,res)=>{
    const{empid}=req.params;
    const d=await emp.findOneAndDelete({empid:empid});
    res.json({message:"deleted"})
})
const port=3000;
app.listen(port,()=>{
    console.log(`server is running on http://localhost:${port}`);
})




    */


