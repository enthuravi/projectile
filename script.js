var slider = document.querySelectorAll('input[type="range"]');
var out= document.getElementsByClassName('out');
for (let i=0; i<2; i++){
  out[i].innerHTML=slider[i].value;
}

document.querySelectorAll('input[type="range"]').forEach((i)=>{
  var value = (i.value - i.min)/(i.max - i.min)*100;
  i.style.backgroundSize = '100% ' + value + '%'});

var canvas=document.querySelector("canvas");
canvas.height=window.innerHeight;
canvas.width=window.innerWidth;

var ctx=canvas.getContext("2d");
var angle=document.getElementsByTagName("input")[0];

window.addEventListener('resize',function(){

canvas.height=window.innerHeight;
canvas.width=window.innerWidth;
})

function background(){
var lg= ctx.createLinearGradient(0,0,0,canvas.height);
lg.addColorStop(0,'rgb(140,200,255)');
lg.addColorStop(1,'white');
ctx.fillStyle=lg;
ctx.fillRect(0,0,canvas.width,canvas.height);

ctx.save()
ctx.translate(0,canvas.height-500);
ctx.fillStyle='rgb(200,235,130)';
ctx.beginPath()
ctx.moveTo(0,400);
ctx.bezierCurveTo(360,300,690,500,canvas.width,420)
ctx.lineTo(canvas.width,500);
ctx.lineTo(0,500);
ctx.fill();

ctx.fillStyle='rgb(140,170,5)';
ctx.beginPath()
ctx.moveTo(0,460);
ctx.bezierCurveTo(360,500,690,300,canvas.width,390)
ctx.lineTo(canvas.width,500);
ctx.lineTo(0,500);
ctx.fill();
ctx.restore();}

ctx.save();
background();

//canyon
ctx.translate(50,canvas.height-100);
ctx.beginPath();
ctx.arc(0,0,3,Math.PI,0);
ctx.lineTo(3,7);
ctx.lineTo(-3,7);
ctx.closePath();
ctx.stroke();
ctx.save();
ctx.rotate(10*Math.PI/-180);
ctx.beginPath();
ctx.arc(0,0,5,Math.PI/2,Math.PI/2*3);
ctx.lineTo(10,-3);
ctx.lineTo(10,3);
ctx.closePath();
ctx.stroke();
ctx.strokeRect(10,-3,2,6);
ctx.restore();
ctx.restore();

var arrayra=[];
var path = []; var tof;
function myfunction(){
document.querySelectorAll('input[type="range"]').forEach((i)=>{
  var value = (i.value - i.min)/(i.max - i.min)*100;
  i.style.backgroundSize = '100% '+value + '%'}
);

for (let i=0; i<2; i++){
  out[i].innerHTML=slider[i].value;
}

ctx.save();
ctx.clearRect(0,0,canvas.width,canvas.height);
background();
ctx.translate(50,canvas.height-100);
ctx.beginPath();
ctx.arc(0,0,3,Math.PI,0);
ctx.lineTo(3,7);
ctx.lineTo(-3,7);
ctx.closePath();
ctx.stroke();
ctx.save();
ctx.rotate(angle.value*Math.PI/-180);
ctx.beginPath();
ctx.arc(0,0,5,Math.PI/2,Math.PI/2*3);
ctx.lineTo(10,-3);
ctx.lineTo(10,3);
ctx.closePath();
ctx.stroke();
ctx.strokeRect(10,-3,2,6);
ctx.restore();

var velocity=document.getElementsByTagName("input")[1];
var v_y=velocity.value*Math.sin(angle.value*Math.PI/180);

tof=2*v_y/9.8; //console.log(tof)

ctx.save();
ctx.translate(canvas.width/2-50,-1*canvas.height + 100);
ctx.fillStyle="black";
ctx.fillRect(10,10,200,105);

var string = "h max= " +   Math.round((v_y*tof/2 - 1/2*9.8*Math.pow(tof/2,2))*100)/-100 + " m";

ctx.fillStyle="lime";
ctx.font="24px calibri";
ctx.fillText("v= " + velocity.value + " m/s",20,36);
ctx.fillText("h max= " +   Math.round((v_y*tof/2 - 1/2*9.8*Math.pow(tof/2,2))*100)/-100 + " m",20,60);
ctx.fillText("Range= " +   Math.round(tof*velocity.value*Math.cos(angle.value*Math.PI/180)*10)/10 + " m",20,84);
ctx.fillText("Angle= " +   angle.value + "°",20,108);
ctx.restore();

path =[];
ctx.save();
ctx.beginPath();
ctx.setLineDash([5,5]);
ctx.strokeStyle="red";
for(let i=0; i<tof*100; i++){
ctx.lineTo(i/100*velocity.value*Math.cos(angle.value*Math.PI/180)/1100*canvas.width,(-1*v_y*i/100+1/2*9.8*Math.pow(i/100,2))/1100*canvas.width);

path.push([i/100*velocity.value*Math.cos(angle.value*Math.PI/180)/1100*canvas.width,(-1*v_y*i/100+1/2*9.8*Math.pow(i/100,2))/1100*canvas.width]);}
ctx.stroke();
ctx.restore();
ctx.restore();}

function play(){
  document.querySelectorAll(['input','button']).forEach((i)=>{i.setAttribute('disabled','')})
  ctx.save();
  var now = new Date;
  const tingu = setInterval(function(){
    myfunction();
    var instant = new Date;
    var int= instant.getTime() - now.getTime();
      if (int < path.length*10){
        ctx.fillText(int.toString(),100,-500);
        ctx.beginPath();
        ctx.arc(50 + path[Math.round(int/10)][0],canvas.height-100 + path[Math.round(int/10)][1],5,0,2*Math.PI);
        ctx.fillStyle='red';
        ctx.closePath();
        ctx.fill();
      }
  },0);
  setTimeout(() => {
    clearInterval(tingu);
    document.querySelectorAll(['input','button']).forEach((i)=>{i.removeAttribute('disabled')});
  },path.length*10 +2000);
  ctx.restore();
}
