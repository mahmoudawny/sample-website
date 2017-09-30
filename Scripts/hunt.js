var oldx,oldy;
var stop = true;
var timer = 0;
var timeout = 1000;
var counter = 0;
var afterimage = "Content/dry.gif"
var speed = 50;

$(document).ready(function(){
    $(".back").css("font-size","8.2vmin");
    if(parseInt($(".back").css("font-size")) <= 30) 
        $(".back").css("font-size","30px"); 
    $(window).on("resize", function(){onResize()});
    $("#hunted").on("mouseenter", function(){if(!stop) hunt(getx(), gety())});
    $("#hunted").on("click", function(){hit(getx(), gety())});
    $(window).on("contextmenu", function(e){e.preventDefault();});
    $("#hunted").on("dragstart", function(e){e.preventDefault();}); 
    $("#pause").css({display: "block"});  
    var appen = $("#pausetext").children();
    $("#pausetext").html("&nbsp;Click to start hunting!&nbsp;").append(appen).children(0).html("Start Hunt");
    $("#start").click(function(){
        stop = false;
        focusIn();
    });
    $("#hunted").on("load", function(){
      if($("#hunted").attr("src") == afterimage)
        $("#hunted").on("click", function(){location.reload()});
    });
        timer = setInterval(function(){
      if(!stop && counter < timeout){
        counter++;
        if(counter >= timeout * 0.7) $(".counter").css({"animation-name": "flashred", "animation-duration": "0.5s", "animation-iteration-count": "infinite"});
        else $(".counter").css({"background-color": "white" ,"animation-name": "none"});
        displayCounter(counter);
      }    
      else if(counter >= timeout){ 
        stop = true;
        gameOverScreen();
      }
    }, 10); 
});

function onResize(){
    $(".back").css("font-size","8.2vmin");
    if(parseInt($(".back").css("font-size")) <= 30) 
        $(".back").css("font-size","30px"); 
}

function focusLost(){
    stop = true;
    $("#huntbg").off("focusout");
    $(window).off("mousemove");
    $("#pause").css({display: "block"});
    var appen = $("#pausetext").children();
    $("#pausetext").html("&nbsp;Paused, come back soon&nbsp;").append(appen).children(0).html("Hunt");
    $("#start").click(function(){
        stop = false;
        focusIn();
    });
}

function focusIn(){
    $("#pause").css({display: "none"});
    $("#huntbg").focus();     
    $("#huntbg").on("focusout", function(){focusLost()});        
    $(window).on("mousemove", function(){
        if(!stop && gety() < 100) {focusLost()};
    });   
}

function gameOverScreen(){
    stop=true;
    $("#huntbg").off("focusout");
    $(window).off("mousemove");
    $("#pause").css({display: "block"});
    var appen = $("#pausetext").children();
    $("#pausetext").html("&nbsp;Oooops! Game appears to be over&nbsp;").append(appen).children(0).html("Hunt Again");
    $("#start").click(function(){
        stop = false;
        focusIn();
    });
    counter = 0;
}

function displayCounter(c){
    var msec = String(c%100);
    $(".counter").html("&nbsp;" + String(Math.floor(c/100)) + ":" + 
      (msec > 9 ? "" + msec: "0" + msec) + "&nbsp;");
      
}

function hunt(x,y) {
   var huntbg=0, hunted=0, wid=0, height=0, picH=0, picW=0, xDirection=0, yDirection=0;
   var maxposx=0, maxposy=0, newposx, newposy;
   xDirection = Math.random();
   yDirection = Math.random();
   hunted = document.getElementById("hunted");
   if(xDirection > 0.5) xDirection = 1;
   else xDirection = -1;
   if(yDirection > 0.5) yDirection = 1;
   else yDirection = -1;
   speed += xDirection;
   huntbg = document.getElementById("huntbg");
   head = document.getElementById("head");
   wid = huntbg.offsetWidth;
   height = huntbg.offsetHeight;
   picH = hunted.offsetHeight;
   picW = hunted.offsetWidth;
   
   maxposx = parseInt(wid) - parseInt(picW);
   maxposy = parseInt(height) - parseInt(picH);

   if(hunted.style.left.length == 0  ) { 
     hunted.style.left="0px";
     xDirection = 1;
   }
   if(hunted.style.top.length == 0){
     hunted.style.top="0px";
     yDirection = 1;
   }
   var randx = Math.floor((Math.random() * 170) + 160);
   var randy = Math.floor((Math.random() * 170) + 160);
   x = parseInt(hunted.style.left) + (randx * xDirection);
   y =  parseInt(hunted.style.top) + (randy * yDirection);

   newposx = x + "px";
   newposy = y + "px"; 
   
   if(x > 0 && x <= maxposx && y <= maxposy && y > parseInt(head.offsetHeight)){
     $("#hunted").animate({left: newposx, top: newposy}, speed, "linear");
   }   
   else if(x <= 0 && y <= maxposy && y > parseInt(head.offsetHeight)){
        $("#hunted").animate({left: maxposx + "px", top: newposy}, speed, "linear");
      }
   else if(x > maxposx && y <= maxposy && y > parseInt(head.offsetHeight)){
        $("#hunted").animate({left: "1px", top: newposy}, speed, "linear");
      }   
   else if(y <= parseInt(head.offsetHeight) && x > 0 && x <= maxposx){
        $("#hunted").animate({left: newposx, top: maxposy + "px"}, speed, "linear");
      }
   else if(y > maxposy && x > 0 && x <= maxposx){
        $("#hunted").animate({left: newposx, top: head.offsetHeight}, speed, "linear");
      }
   else if((y > maxposy || y <= parseInt(head.offsetHeight)) && (x < 0 || x > maxposx)){
     $("#hunted").animate({left: "600px", top: "400px"}, speed, "linear");        
   }
    //  else alert("out of ifs");

   
}

// stop moving if hit target successfully
function hit(x,y) { 
  if(!stop){ 
   $(".counter").css({"background-color": "green", "color":"white" ,"animation-name": "none"}); 
   $("#hunted").off("mouseenter");
   $("#hunted").stop();
   //position image in the middle
   $("#hunted").css({ left: "50%",top: "25%", width: "500px", height: "300px", padding: "0", border: "10px solid #123", borderRadius: "10px"}).css({left: "-=" + String(parseInt($("#hunted").css("width"))/2) + "px"});
   stop = true;
   $("#hunted").attr("src", "Content/catfall.gif");
   setTimeout(function(){$("#hunted").attr("src", afterimage)}, 4000);
  }
  else $("#hunted").attr("src", afterimage);
    
}

function getx() {
var x = event.clientX;
return x;
}

function gety() {
var y = event.clientY;
return y;
}

