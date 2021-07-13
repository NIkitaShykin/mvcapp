const { response } = require("express");
const User = require("../models/user.js");

exports.addUser = function(req,res){
    res.render("create.hbs");
};

exports.getUsers = function(req,res){
    User.find({}, function(err,allUsers){
        if(err){
            console.log(err);
            return res.sendStatus(400);
        }
        res.render("users.hbs", {
            users: allUsers
        });
    });
};

exports.postUser = function(req,res){
    if (!req.body) return response.sendStatus(400);
    const username = req.body.name;
    const userage = req.body.age;
    const user = new User({name: username,age: userage});
    user.save(function(err){
        if (err) return console.log(err);
        res.redirect("/users");
    });
}