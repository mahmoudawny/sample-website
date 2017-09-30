var titles =["Chrysanthemum Flower","Trip to the Desert","Blue Roses"];
var imagename =["Chrysanthemum","Desert","Hydrangeas"];
var index = 0, screenw, distance = 0;
var imagew, secondw;
    

$(document).ready(function(){
    $("body").keyup(function(e){
       if(e.keyCode == 32) stopAnimation(); 
    });
    $(".bigimage").on("click", function(){onNextImage()});
    $(".bigimage").attr("src", "./assets/"+imagename[index]+".jpg");
    screenw = parseInt($(".container").css("width"));
    $(".header p").css("font-size","3.2vmin");
    if(parseInt($(".header p").css("font-size")) <= 12) 
        $(".header p").css("font-size","12px");
    $(".header h2").css("font-size","4.2vmin");
    if(parseInt($(".header h2").css("font-size")) <= 16) 
        $(".header h2").css("font-size","16px");
    $(".back").css("font-size","8.2vmin");
    if(parseInt($(".back").css("font-size")) <= 30) 
        $(".back").css("font-size","30px");
    imagew = $(".bigimage").css("width"); 
    $(window).on("resize", function(){onResize()});
});

function onResize(){
    screenw = parseInt($(".container").css("width"));
    $(".header p").css("font-size","3.2vmin");
    if(parseInt($(".header p").css("font-size")) <= 12) 
        $(".header p").css("font-size","12px");
    $(".header h2").css("font-size","4.2vmin");
    if(parseInt($(".header h2").css("font-size")) <= 16) 
        $(".header h2").css("font-size","16px");
    $(".back").css("font-size","8.2vmin");
    if(parseInt($(".back").css("font-size")) <= 30) 
        $(".back").css("font-size","30px");        
    imagew = $(".bigimage").css("width"); 
}


function onNextImage(){
    $(".bigimage").off("click");
    $(".nextimage").off("click");
    $(".bigimage").animate({left: (screenw * 2) + "px"}, {duration:1000,
        easing: 'swing', 
        start: function(){
                $(document).on("mousedown mouseup", function(){stopAnimation()});    
        },
        done: function(){
                $(".bigimage").css("display", "none");
                $(document).off("mousedown mouseup");
                $(".nextimage").on("click", function(){onSecondImage()});
                
        }
    });
    onNext();
}

function onNext(){ 
    index++;
    if(index >= imagename.length) index = 0;  
    $(".nextimage").css("left","-" + imagew); 
    $(".nextimage").attr("src", "./assets/" + imagename[index] + ".jpg");
    $(".nextimage").css("display", "inline");   
    $(".nextimage").animate({left: "50%" }, {duration:1600, 
        easing: 'easeOutBounce',
    });
}

function onSecondImage(){
    $(".bigimage").off("click");
    $(".nextimage").off("click");
    $(".nextimage").animate({left: (screenw * 2) + "px"}, {duration:1000, 
        easing: 'swing',
        start: function(){
                $(document).on("mousedown mouseup", function(){stopAnimation()});    
            },
        done: function(){
                $(".nextimage").css("display", "none");
                $(document).off("mousedown mouseup");
                $(".bigimage").on("click", function(){onNextImage()});
                
            }
    });
    onImage();
}

function onImage(){
    index++;
    if(index >= imagename.length) index = 0; 
    $(".bigimage").css("left","-" + imagew);
    $(".bigimage").attr("src", "./assets/" + imagename[index] + ".jpg");
    $(".bigimage").css("display", "inline");
    $(".bigimage").animate({left: "50%" }, {duration:1600, 
        easing: 'easeOutBounce'
    });
}

// stopping animations
function stopAnimation(){
    $(".bigimage").stop(true,true);
    $(".nextimage").stop(true,true);    
}