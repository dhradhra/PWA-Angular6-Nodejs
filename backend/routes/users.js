var express = require('express');
var router = express.Router();
var Blog = require('./../model/blog.js');
var Post = require('./../model/post.js');
var Register = require('./../model/register.js');
var Subscription = require('./../model/subscription.js');
const path = require("path");
const multer = require("multer");
const jwt  = require('jsonwebtoken'); //json web token import
const webpush = require('web-push');

var url = '';
const storage = multer.diskStorage({
  destination: "./public/uploads/",
  filename: function(req, file, cb){
     cb(null,"IMAGE-" + Date.now() + path.extname(file.originalname));
  }
});

//picture uploading
const upload = multer({
  storage: storage,
  limits:{fileSize: 1000000},
}).single("myImage");

router.post('/api/newsletter', function (req, res) {

  // console.log('Total subscriptions', USER_SUBSCRIPTIONS.length);

  // sample notification payload
  const notificationPayload = {
    "notification": {
      "title": "ByteNews",
      "body": "Bytecode has launched news!",
      "icon": "./assets/icons/icon-96x96.png",
      "vibrate": [100, 50, 100],
      "data": {
        "dateOfArrival": Date.now(),
        "primaryKey": 1,
        "url": "www.bytecodetechnologies.in",
      },
      "actions": [{
        "action": "explore",
        "title": "Go to the site"
      }]
    }
  };
  
  Subscription.find({}, function (err, users) {
    
    
    Promise.all(users.map(sub => webpush.sendNotification(
      sub, JSON.stringify(notificationPayload))))
      .then(() => res.status(200).json({ message: 'Bytecode Newsletter sent successfully.' }))
      .catch(err => {
        console.error("Error sending notification, reason: ", err);
        res.sendStatus(500);
      });
      
      
      
      
      // res.send(users);




  });


 




})
router.get('/api/getDropdownItems', function (req, res, next) {

  res.json({ list: ['list', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a',] });
 
})


router.post('/api/notifications', function (req, res, next) {
  const sub = req.body;

  console.log('Received Subscription on the server: ', sub);
  Subscription.create(sub,
    function (error, result) {
      if(error){
    
      }
      else{
        console.log(result)
        // res.json(result);
        res.json({ message: "Subscription added successfully." });

      }
    })
 })
router.post('/upload', function (req, res, next) {
  // var path = '';
   upload(req, res, function (err) {
    url = req.file.path;
    console.log(url)
      if (err) {        
        console.log(err);
        return res.status(422).send("an Error occured")
      }        
      console.log("uploaded") ;
      return res.send(200).end();
 }); 
 })

//saving blog
router.post('/blog', function(req, res) {
  var title = req.body.title;
  var description = req.body.description;
  var imageUrl = url;
    
  Blog.create({ title: title,description: description, imageUrl: imageUrl}, function (err, result) {
   
     if(result){
      console.log("Blog Saved");
      res.json(result);
    }
  });
})

//saving post
router.post('/post', function(req, res) {
  var title = req.body.title;
  var content = req.body.content;
  var imageUrl = url;
  var blogId = req.body.blogId;
    console.log(blogId)
  Post.create({ title: title,content: content, imageUrl: imageUrl, blogId: blogId}, function (err, result) {
   
     if(result){
      console.log("Post Saved");
      res.json(result);
    }
  });
})

//get all blogs
router.get('/blog', function(req, res) {
     
  Blog.find(function (err, result) {
   
    res.json(result)
  });
})

//register user
router.post('/register', function (req, res, next) {
  var email = req.body.email;
  var password = req.body.password;
  var state = req.body.state;
  var city = req.body.city;
  Register.findOne({email: email},function (err, result) {
   if(result){
    res.json("Email already exists!!")
   }
   else{
   Register.create({email: email, password: password, state: state, city: city},
    function(error, result){
      res.json(result);
    })
  }
  });
  
 })

 //login code
 router.post('/login', function (req, res, next) {
  var email = req.body.email;
  var password = req.body.password;  
  Register.findOne({email: email, password: password},function (err, result) {
    if(err) return err;
    else if(result){
    var token = jwt.sign({ email: email },'37LvDSm4XvjYOh9Y', { expiresIn: '100m' });
    console.log(token);
    res.json({result, token});
    }
    else{
      res.json({"result":"User not found!!"});
    }
  });
 })

module.exports = router;
