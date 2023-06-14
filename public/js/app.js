const express = require("express");
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
const _ = require("lodash");
const date = require(__dirname + "/date.js");

const app = express();
app.use(bodyparser.urlencoded({
  extended: true
}));
app.set('view engine', 'ejs');
app.use(express.static("public"));
mongoose.connect("mongodb+srv://karthi:Todolist@cluster0.i7vhfyc.mongodb.net/Todolist", {
  useNewUrlParser: true
});

const todolistschema = new mongoose.Schema({
  name: String
});
const listschema = new mongoose.Schema({
  name: String,
  items:[todolistschema]
});

const List = mongoose.model("List", todolistschema);
const Tolist = mongoose.model("Tolist", listschema);


const l1 = new List({
  name: "Let's Get Things Done Today 🥰",
});

const list = [l1];

let day = date.gdate();
let greet = date.greet();

app.get("/", function(req, res) {
  List.find({}).then(data => {
    if(data.length==0)
    {
      List.insertMany(list).then(data => {
        console.log("sucess");
      });
        res.redirect("/");
    }
    else{
        res.render("dolist", {whatDay:"Today",newList: data,greeting: greet});
    }
  });
});

app.post("/", function(req, res) {
  const listname=req.body.submit;

  const item = new List({
    name: req.body.newItem
  });
  if(listname==="Today")
  {
  item.save();
  res.redirect("/");
  }
  else{
    Tolist.findOne({name:listname}).then(data=>{
      data.items.push(item);
      data.save();
      res.redirect("/"+listname);
});
}
});
app.post("/delete", function(req, res) {
  const id=req.body.checkbox;
  const listname=req.body.listele;
  listname.substring(0,listname.length-1);
  console.log(listname);
  if(listname==="Today")
  {
    List.findByIdAndRemove(id).then(data => {
      console.log("delete sucess");
      res.redirect("/");
    });
  }
    else{
       Tolist.findOneAndUpdate({name:listname},{$pull:{items:{_id:id}}}).then(data=>
    {
      console.log("delete sucess");
      res.redirect("/"+listname);
    });
    }
  });

app.get("/:customName", function(req, res) {
  const customListname=_.capitalize(req.params.customName);
  Tolist.findOne({name:customListname}).then(data=>{
    if(!data)
    {
      const cusList = new Tolist({
        name: customListname,
        items:list
      });
      cusList.save();
      res.redirect("/"+customListname);
    }
    else{
        res.render("dolist", {whatDay:data.name,newList: data.items,greeting: greet});
    }
    });
  });
app.listen(3000, function(req, res) {
  console.log("server is starting...");
});
