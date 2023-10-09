
const message = "This is the best time to have a look at this website "

const dateTimeNow = new Date();
console.log(dateTimeNow.toLocaleDateString()); // 17/08/2020
console.log(dateTimeNow.toLocaleTimeString()); // 13:26:15

alert(message + "\nHere is the date and the time\n" + dateTimeNow);
