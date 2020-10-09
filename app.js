const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const Joi = require("joi");

const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res)=>{
    res.render("home");
});

app.post("/", (req, res)=>{
    const schema = Joi.object().keys({
        email: Joi.string().trim().email().required(),
        password: Joi.string().min(5).max(10).required()
    });
    const result = schema.validate(req.body);
    const {value, error} = result;
    if(error){
        res.write(error.details[0].message);
        res.write("\n Please try again !!");
        res.send();
    }
    else{
        res.send("Success !!");
    }
});

app.listen(3000, ()=>{
    console.log("Server is up and running on port 3000");
});