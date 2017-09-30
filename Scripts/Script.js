function myFunction() {
    var message, x;
    message = document.getElementById("message");
    message.innerHTML = "";
    x = document.getElementById("demo").value;
    try {
        if(x == "")  throw "is empty";
        if(isNaN(x)) throw "is not a number";
        x = Number(x);
        if(x > 10)   throw "is too high";
        if(x < 5)    throw "is too low";
    }
    catch(err) {
        message.innerHTML = "Input " + err;
    }
    finally {
        document.getElementById("demo").innerHTML = "";
    }
}

// load BG 
$(function(){
    $("body").css("background-image", "url(./assets/Tulips.jpg)");
});



