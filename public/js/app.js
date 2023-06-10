const express=require("express");
const bodyparser=require("body-parser");
const mongoose=require("mongoose");
const date=require(__dirname+"/date.js");

const app=express();
app.use(bodyparser.urlencoded({extended:true}));
app.set('view engine','ejs');
app.use(express.static("public"));
mongoose.connect("mongodb://127.0.0.1:27017/todolist",{useNewUrlParser:true});

const todolistschema=new mongoose.Schema({
  name:String
})

const List= mongoose.model("List",todolistSchema);


let items=[];
let workItems=[];

app.get("/",function(req,res){
  let day=date.gdate();
  let greet=date.greet();
    res.render("dolist",{
      whatDay:day,
      newList:items,
      greeting:greet
    });
});

app.post("/",function(req,res)
{
const item={
list:req.body.newItem,
start:req.body.sTime,
end:req.body.eTime
};
if(req.body.submit ==="Work-List")
{
  workItems.push(item);
  res.redirect("/work");
}
else{
  items.push(item);
  res.redirect("/");
}
});


app.get("/work",function(req,res){
  let greet=date.greet();
  res.render("dolist",{
    whatDay:"Work-List",
    newList:workItems,
    greeting:greet
  });
});

app.post("/work",function(req,res)
{
let item=req.body.newItem;
workItems.push(item);
res.redirect("/work");
});

app.listen(3000,function(req,res){
    console.log("server is starting...");
});
