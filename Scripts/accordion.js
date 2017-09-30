var timeout = null;
$(function() {
// always collapse all while expanding one
  $('#accordion-sample').on('show.bs.collapse',function(){
        $('#accordion-sample .in').collapse('hide');
  });

// on clicking Page Header hide all if any is shown, else show all  
  $('#toggleall').on('click', function() {
      $('.panel-title > a').attr('data-toggle','');
      if($('.panel-collapse.in').length){
        $('.panel-collapse').collapse('hide'); 
         $(this).html('News Details');      
      }
      else{
        $('.panel-collapse').collapse('show');
        $(this).html('All News');
      }
    });
    
});

//load page content (next step: load from db)
$(document).ready(function onLoad(){
    var titles =["Chrysanthemum Flower","Trip to the Desert","Blue Roses"];
    var imagename =["Chrysanthemum","Desert","Hydrangeas"];
    var thumbname =["Chrysanthemum","Desert","Hydrangeas"];
    
    titles.forEach(function(element,i) {
    document.getElementsByTagName("h3")[i].getElementsByTagName("a")[0].textContent=element; 
    }, this);
    imagename.forEach(function(element,i) {
    document.getElementsByClassName("images")[i].setAttribute("src", "./assets/"+element+".jpg");
    document.getElementsByClassName("caption")[i].textContent=element; 
    }, this);
    thumbname.forEach(function(element,i) {
    document.getElementsByClassName("thumbs")[i].setAttribute("src", "./assets/"+element+".jpg"); 
    }, this);
    $(".header a").css("font-size","4.2vmin");
    if(parseInt($(".header a").css("font-size")) <= 20) 
        $(".header a").css("font-size","20px");
    $(".back").css("font-size","8.2vmin");
    if(parseInt($(".back").css("font-size")) <= 30) 
        $(".back").css("font-size","30px"); 
 // adjust popup on page resize
    $(window).on("resize", function(e){onResize(e)});
 // adjust popup position on page scroll
 // expand panel of hovered image (thumb or popup) after 1 sec of waiting        
    $("img").on("mouseover", function(e){
        positionSpan(e);
        $(document).scroll(function(){positionSpan(e);});
        timeout = setTimeout(function(){hoverThumb(e)}, 1000);
    })
    $("img").on("mouseout", function(){
        $(document).off("scroll");
        clearTimeout(timeout);
    });
});


function onResize(e){
    $(".header a").css("font-size","4.2vmin");
    if(parseInt($(".header a").css("font-size")) <= 20) 
        $(".header a").css("font-size","20px");
    $(".back").css("font-size","8.2vmin");
    if(parseInt($(".back").css("font-size")) <= 30) 
        $(".back").css("font-size","30px"); 
    positionSpan(e);    
}



function hoverThumb(e) { 
    $('.panel-title a').attr('data-toggle','collapse');
// hide all panels excepts the one hovered
// check if class of hovered item is thumbs or images and  find the panel to collapse accordingly
    if($(e.target).attr("class") == "thumbs")
        $(e.target).parent().parent().siblings('.panel-collapse').collapse('show');
    else 
        $(e.target).parent().parent().parent().siblings('.panel-collapse').collapse('show');
}

function positionSpan(e){
// adjust popup position   
    if($(e.target).attr("class") == "thumbs"){
        var div = $(e.target).parent().children(".span");
        var row = $(e.target).parent(".panel-toggle");
        div.css({"transform": "translateY(1%)"});
    // get row position and subtract popup top value (top offset in css)
        var spantop = parseInt(div.offset().top); 
        var spanbottom = spantop + parseInt(div.css("height"));
        if(spanbottom > window.innerHeight + window.pageYOffset){             
            // if popup bottom below page bottom move popup up by the overflow amount
            div.css({"transform": "translateY(-" + String(spanbottom - window.innerHeight - window.pageYOffset) +"px)"});
        }
        if(spantop < window.pageYOffset){             
            // if popup top above page top move popup down by YOffset - Header height 
            div.css({"transform": "translateY(" + String(window.pageYOffset - parseInt($(".header").css("height"))) + "px)"});
        } 
    }
}



function onClickLink(i){
    $('.panel-title a').attr('data-toggle','collapse');
    $('#accordion'+i).collapse('toggle');
    clearTimeout(timeout);
}


// delay function 
 function delayfn(elem, callback) {
    elem.on("mouseover", function(){timeout = setTimeout(function(){callback}, 1000);})
    elem.on("mouseout", function(){clearTimeout(timeout);});
}



//  function delay(elem, callback) {
//     elem.onmouseover = function() {
//         // Set timeout to be a timer which will invoke callback after 1s
//         timeout = setTimeout(callback, 1000);
//     };

//     elem.onmouseout = function() {
//         // Clear any timers set to timeout
//         clearTimeout(timeout);
//     };
// };
