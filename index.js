const readline = require('readline-sync');

var CUMULATIVE_MONTH_DAYS = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
var MONTH_LENGTHS = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
var MIN_YEAR = 1901;
var MAX_YEAR = 2999;

main();

function main() {
  var firstDate = getDate();
  firstDate = validateDate(firstDate);

  var d1 = firstDate[0];
  var m1 = firstDate[1];
  var y1 = firstDate[2];

  var secondDate = getDate();
  secondDate = validateDate(secondDate);

  var d2 = secondDate[0];
  var m2 = secondDate[1];
  var y2 = secondDate[2];

  var firstDateDays = countDays(d1, m1, y1);
  var secondDateDays = countDays(d2, m2, y2);

  var daysDifference = Math.abs(firstDateDays - secondDateDays);

  // decrement because dates are exclusive
  daysDifference--;
  process.stdout.write(daysDifference + ' days' + '\n');
}

function getDate() {
  var date = readline.question();
  return date.split('/');
}

function countDays(day, month, year) {
  var daysByYear = countDaysByYear(year);
  var daysByMonth = countDaysByMonth(month, year);
  var totalDays = daysByYear + daysByMonth + day;

  return totalDays;
}

function countDaysByYear(year) {
  var days = 365 * year;

  year--;
  return days + Math.floor(year/4) - Math.floor(year/100) + Math.floor(year/400);
}

function countDaysByMonth(month, year) {
  var days = CUMULATIVE_MONTH_DAYS[month-1];

  if (isLeapYear(year) && month > 2) {
    days += 1;
  }

  return days;
}

function isLeapYear(year) {
  return year % 100 == 0 ? year % 400 == 0 : year % 4 == 0;
}

function validateDate(date) {
  if (date.length != 3) {
    quit();
  }

  day = parseInt(date[0]);
  month = parseInt(date[1]);
  year = parseInt(date[2]);

  if (isLeapYear(year) && month == 2) {
    if (!(day > 0 && day <= 29)) {
      quit();
    }
  } else {
    if (!(day > 0 && day <= MONTH_LENGTHS[month-1])) {
      quit();
    }
  }

  if (!(month > 0 && month <= 12)) {
    quit();
  }

  if (!(year >= MIN_YEAR && year <= MAX_YEAR)) {
    quit();
  }

  return [day, month, year];
}

function quit() {
  process.stdout.write('Date is invalid \n');
  process.exit();
}
