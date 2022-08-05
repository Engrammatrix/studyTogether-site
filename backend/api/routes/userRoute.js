//Created by Nafiz Mazumder - B00811858 - added post "/user", post "/adduser", get "/mygroups/:id", post "/addgroup/:id", get "/publicgroups"

//"/adduser" post request edited by Noah Cormier-Ratajczak - B00812758 - Changes made to check for existing emails in the database
// and returning user object so that the dashboard/:id page can be shown and the users security code can be fetched

const express = require("express");
const { uuid } = require('uuidv4');
const User = require("../mongodb/user");
const Group = require("../mongodb/studygroup");
const CryptoJS = require("crypto-js");


const router = express.Router();


router.get("/users", (req, res) => {
    User.find().exec().then(result => {
        if(User){
            return res.status(200).json({
                message: "Users retrieved",
                success: true,     
                users: result
            });
        }
        else{
            return res.status(404).json({
                message: "User not found!!!",
                success: false,     
                
            });
        }
    }).catch(err => {
        console.log(err => {
            return res.status(500).json({
                message : "Internal server error.",
                success: false
            });
        });
    });
});

router.post("/user", (req, res) => {
    User.findOne({ 
        $and: [
            { email: {$eq: req.body.email }}
           
        ]
    }).then(result => {
        if(result!==null){
            return res.status(200).json({
                message: "User retrieved",
                success: true,     
                user: result
            });
        }
        else{
            return res.status(401).json({
                message: "User not found",
                success: false,     
            });
        }
    }).catch(err => {
        console.log(err => {
            return res.status(500).json({
                message : "Internal server error.",
                success: false
            });
        });
    });
});
// Raham
router.post("/user2", (req, res) => {
    User.findOne({ 
        $and: [
            { email: {$eq: req.body.email }}, 
           // { securityCode: {$eq: CryptoJS.AES.encrypt(req.body.securityCode , 'my-secret-key@123').toString() }}
           // { securityCode: {$eq: req.body.securityCode }}
          // { securityCode: CryptoJS.AES.encrypt(req.body.securityCode , 'my-secret-key@123').toString() }
           
        ]
    }).then(result => {
        if(result!==null){
            return res.status(200).json({
                message: "User retrieved",
                success: true,     
                user: result
            });
        }
        else{
            return res.status(401).json({
                message: "User not found",
                success: false,     
            });
        }
    }).catch(err => {
        console.log(err => {
            return res.status(500).json({
                message : "Internal server error.",
                success: false
            });
        });
    });
});
router.get("/user/:id", (req, res) => {
    User.findOne({ 
        $and: [
            {sessionCode: req.params.id.replace(':', '')}
        ]
    }).then(result => {
        if(result!==null){
            return res.status(200).json({
                message: "User retrieved",
                success: true,     
                user: result
            });
        }
        else{
            return res.status(401).json({
                message: "User not found",
                success: false,     
            });
        }
    }).catch(err => {
        console.log(err => {
            return res.status(500).json({
                message : "Internal server error.",
                success: false
            });
        });
    });
});






router.put("/update/:id", (req,res) => {
    User.findOneAndUpdate({_id: req.params.id.replace(':', '')}, req.body).then(result => {
        return res.status(200).json({
            message: "Users updated",
            success: true   
        });
    }).catch(error => {
        console.log(error => {
            return res.status(500).json({
                message : "Internal server error.",
                success: false
            });
        });
    });
});


router.post("/adduser", (req, res) => {
    var a = uuid();
    User.findOne({
      $and: [
          {email: {$eq: req.body.email}}
      ]  
    }).then(result =>{
        if(result==null){
            const newUser = new User({
                email: req.body.email,
                password: req.body.password,
        
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                //lastName: a,
                securityCode:CryptoJS.AES.encrypt(a, req.body.password).toString(),
                sessionCode: uuid()

                //securityCode:req.body.securityCode
        
            });
            newUser.save().then(result => {
                console.log(result);
                return res.status(200).json({
                    message:"User Created",
                    success: true,
                    user: result
                });
            });   
        }
        else{
            return res.status(409).json({
                message: "User already exists.",
                success: false
            });
        }
    }).catch(error => {
        console.log(error => {
            return res.status(500).json({
                message : "Internal server error.",
                success: false
            });
        });
    });   
});


router.get("/mygroups/:id", (req, res) => {
    Group.find({members: req.params.id.replace(':', '')}).then(result => {
        if(Group){
            return res.status(200).json({
                message: "Groups retrieved",
                success: true,     
                groups: result
            });
        }
    }).catch(err => {
        console.log(err => {
            return res.status(500).json({
                message : "Internal server error.",
                success: false
            });
        });
    });
});

router.post("/addgroup/:id", (req, res) => {
    const newGroup = new Group({
        createdBy: req.params.id.replace(':', ''),
        name: req.body.name,
        size: req.body.size,
        visibility: req.body.visibility,
        description: req.body.description,
        members: req.params.id.replace(':', '')
    });
    newGroup.save().then(result => {
        console.log(result);
        return res.status(200).json({
            message: "Group created",
            success: true 
        });
    }).catch(error => {
        console.log(error => {
            return res.status(500).json({
                message : "Internal server error.",
                success: false
            });
        });
    });
});




router.get("/publicgroups", (req, res) => {
    Group.find({visibility: "Public"}).then(result => {
        if(Group){
            return res.status(200).json({
                message: "Public groups retrieved",
                success: true,     
                groups: result
            });
        }
    }).catch(err => {
        console.log(err => {
            return res.status(500).json({
                message : "Internal server error.",
                success: false
            });
        });
    });
});


module.exports = router;
