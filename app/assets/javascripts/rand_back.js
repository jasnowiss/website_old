$(document).ready(function()
{
//Function to generate random color code
function getRandomColor() {

    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
    
}
 
function change_random_bgcolor(change_time) {

	// setInterval(function change_color() {
 //        $("#pretty-colors").animate({backgroundColor: getRandomColor()}, 500);
 //    }, change_time);

    // setInterval(function change_color() {
    //     document.getElementById("pretty-colors").style.backgroundColor = getRandomColor();
    // }, 1500);

    setInterval(function change_color() {
        $("#pretty-colors").css("background-color", getRandomColor());
    }, change_time);

}

change_random_bgcolor(2000);
});
