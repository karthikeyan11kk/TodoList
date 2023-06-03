exports.gdate=function (){
  let today=new Date();
  let option={
    weekday:"long",
    day:"numeric",
    month:"long",
    year:"numeric",
    hour:"2-digit",
    minute:"2-digit",
    hour12: false
  };
let day=today.toLocaleString("en-US",option);
return day;
}

exports.greet=function ()
{
  let today=new Date();
  let hour=today.getHours("en-US");
  let greet="";
  if(hour>=1 && hour<=12)
  {
     greet="Good Morning!!";
  }
  else if(hour>12 && hour<=14)
  {
     greet="Good Afternoon!!";
  }
  else if(hour>14 && hour<=17)
  {
     greet="Good Evening!!";
  }
  else{
     greet="Good Night!!";
  }
  return greet;
}
