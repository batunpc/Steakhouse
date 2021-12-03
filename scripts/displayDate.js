let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
'August', 'September', 'October', 'November', 'December'];
let tomorrow = new Date();
tomorrow.setTime(tomorrow.getTime() + (1000 * 3600 * 24));
document.getElementById("spanDate").innerHTML = months[(tomorrow.getMonth())-1] + " " + tomorrow.getDate() + ", " + tomorrow.getFullYear() + "<br/>" + "perfect date to order your Steak. Grilled just the way you like it!" + "<br/><br/>";