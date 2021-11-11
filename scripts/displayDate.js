var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
'August', 'September', 'October', 'November', 'December'];
var tomorrow = new Date();
tomorrow.setTime(tomorrow.getTime() + (1000 * 3600 * 24));
document.getElementById("spanDate").innerHTML = months[tomorrow.getMonth()] + " " + tomorrow.getDate() + ", " + tomorrow.getFullYear() + "<br/><br/>" + "perfect day to order your Steak. Grilled just the way you like it!";