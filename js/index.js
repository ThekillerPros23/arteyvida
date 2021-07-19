document.getElementById("tierra")
document.getElementById("salto").onmouseover = function(){nevermind();}
document.getElementById("salto").onmouseout = function(){neverminds();}
function nevermind()
{
    document.getElementById("salto").style.border = "solid 10px green";
    document.getElementById("salto").style.fontSize = "64px";
    document.getElementById("salto").style.color = "blue";
    document.getElementById("salto").innerHTML =  "new";
}
function neverminds()
{
    document.getElementById("salto").style.border = "solid 10px black";
    document.getElementById("salto").innerHTML = "hello";
}