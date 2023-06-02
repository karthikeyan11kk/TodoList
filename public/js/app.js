const express=require("express");
const bodyparser=require("body-parser");

const app=express();
app.use(bodyparser.urlencoded({extended:true}));
app.set('view engine','ejs');
app.use(express.static("public"));

let items=[];

app.get("/",function(req,res){
    let today=new Date();
    let option={
      weekday:"long",
      day:"numeric",
      month:"long"
    };
    let day=today.toLocaleDateString("en-US",option);
    res.render("dolist",{
      whatDay:day,
      newList:items
    });
});

app.post("/",function(req,res)
{
let item=req.body.newItem;
items.push(item);
res.redirect("/");
});


app.listen(3000,function(req,res){
    console.log("server is starting...");
});
