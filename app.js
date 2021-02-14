const express = require("express")
const path = require('path')
// const fs=require('fs')
const app = express();
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
// var cons = require('consolidate');

mongoose.connect('mongodb://localhost:27017/contactgym', { useNewUrlParser: true, useUnifiedTopology: true });
const port = 80;

// define mongoose Schema
const contactgymSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    phone: String,
    address: String,
    desc: String,
});


const signup = mongoose.model('signup', contactgymSchema);
console.log("hi");


// app.use(express.static('static', options))

// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // for serving static files
app.use(express.urlencoded())

// PUG SPECIFIC STUFF
app.set('view engine', 'html') // set the template engine as pug
app.set('views',path.join(__dirname,'views') ) // set the views directory


// view engine setup
// app.engine('html', cons.swig)
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'views'));

// ENDPOINT
// app.get("/",(req,res)=>{
//     const con = "This is the best content on the internet";
//     const params ={'title':'pug is a best game', 'content': con}
//     res.status(200).render('home.pug',params);
// });

app.get("/", (req, res) => {
    const params = {}
    res.status(200).render('index', params);
});
// app.get("services", (req, res) => {
//     const params = {}
//     res.status(200).render('services.html', params);
// });
// app.get("about", (req, res) => {
//     const params = {}
//     res.status(200).render('about.html', params);
// });

// app.get("contact", (req, res) => {
//     const params = {}
//     res.status(200).render('contact.html', params);
// });
app.get("/signup", (req, res) => {
    const params = {}
    res.status(200).render('signup', params);
});

app.post("/signup", (req, res) => {
    var mydata = new signup(req.body);
    mydata.save().then(() => {
        res.send("This item has been saved to the database")
    }).catch(() => {
        res.status(400).send("Item was not saved to the database")
    });
    // res.status(200).render('contact.pug');
});


app.listen(port, () => {
    console.log(`the application started successfully on port ${port}`);
})