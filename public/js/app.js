const express=require("express");
const bodyparser=require("body-parser");
const date=require(__dirname+"/date.js");

const app=express();
app.use(bodyparser.urlencoded({extended:true}));
app.set('view engine','ejs');
app.use(express.static("public"));

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
let item=req.body.newItem;
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

app.post("/",function(req,res)
{
let item=req.body.newItem;
workItems.push(item);
res.redirect("/work");
});

app.listen(3000,function(req,res){
    console.log("server is starting...");
});
