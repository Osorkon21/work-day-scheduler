// ## Acceptance Criteria

// WHEN I click the save button for that timeblock
// THEN the text for that event is saved in local storage
// WHEN I refresh the page
// THEN the saved events persist

// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
// $(function () {
// TODO: Add a listener for click events on the save button. This code should
// use the id in the containing time-block as a key to save the user input in
// local storage. HINT: What does `this` reference in the click listener
// function? How can DOM traversal be used to get the "hour-x" id of the
// time-block containing the button that was clicked? How might the id be
// useful when saving the description in local storage?
//
// TODO: Add code to apply the past, present, or future class to each time
// block by comparing the id to the current hour. HINTS: How can the id
// attribute of each time-block be used to conditionally add or remove the
// past, present, and future classes? How can Day.js be used to get the
// current hour in 24-hour time?
//
// TODO: Add code to get any user input that was saved in localStorage and set
// the values of the corresponding textarea elements. HINT: How can the id
// attribute of each time-block be used to do this?
// });

const currentDay = $("#currentDay");
const timeBlocksDiv = $(".time-blocks");

var now = dayjs();
var timerID;

start();

function start() {
  timerID = setInterval(timerHandler, 1000);
  setDate();
  renderTimeBlocks();
}

function timerHandler() {
  now = dayjs();
  hourCheck();
}

function setDate() {

  // "Do" displays today's date with ordinal - requires "advancedFormat" plugin to work
  currentDay.text(now.format("dddd, MMMM Do"));
}

function renderTimeBlocks() {

  // dayjs object set to today's date during the 9 o'clock hour
  var todayAtNine = getTodayAtNine();

  for (var i = 0; i < 8; i++) {
    // var militaryHour = 9 + i;
    // var timeObj = genTimeObject(militaryHour);
    // var timePeriod = getTimePeriod(militaryHour);

    // console.log(timeBlockHour);

    // timeBlocksDiv.append($(`
    //   <div id="hour-${timeBlockHour}" class="row time-block">
    //     <div class="col-2 col-md-1 hour text-center py-3">${timeBlockHour.format("hh A")}</div>
    //     <textarea class="col-8 col-md-10 description" rows="3"> </textarea>
    //     <button class="btn saveBtn col-2 col-md-1" aria-label="save">
    //       <i class="fas fa-save" aria-hidden="true"></i>
    //     </button>
    //   </div>
    // `));
  }

  // var now = dayjs();

  var otherDate = dayjs("2023-10-1");

  var diffBetween = otherDate.diff(now, "hours");

  console.log(diffBetween);

  // var earlierToday = dayjs("2023-10-06 10:00:00");

  // console.log(earlierToday.diff(now, "hours"));

  // $('#1a').text(now.format('M D, YY hh:mm:ss'));

  // var evenLongerAway = dayjs("5/4/27");

  // $("#6a").text(evenLongerAway.diff(now, "days"));

  // console.log(earlierToday.diff(now, "hours"));

  // var now = dayjs();

  // var otherDate = dayjs("2023-10-1");

  // var diffBetween = now.diff(otherDate, "hours");

  // console.log(diffBetween);

  // var earlierToday = dayjs("2023-10-06 10:00:00");

  // console.log(earlierToday.diff(now, "hours"));

  //   < !--Use class for "past", "present", and "future" to apply styles to the
  // time - block divs accordingly.The javascript will need to do this by
  //       adding / removing these classes on each div by comparing the hour in the
  //       id to the current hour.The html provided below is meant to be an example
  //       demonstrating how the css provided can be leveraged to create the
  //       desired layout and colors.The html below should be removed or updated
  //   in the finished product.Remember to delete this comment once the
  //       code is implemented.
  //       -->
}

// checks to see if hour/date has changed, redraws time blocks/date if so
function hourCheck() {

  // new hour, redraw time blocks
  if (now.format("mm:ss") === "00:00") {
    renderTimeBlocks();

    // midnight, new day - update date at top of screen
    if (now.format("HH") === "00")
      setDate();
  }
}

function getTodayAtNine() {
  var diffFromNine = now.format("H") - 9;

  console.log(diffFromNine);

  var todayAtNine = dayjs().add((diffFromNine * -1), 'hour');

  console.log(todayAtNine);
  console.log(todayAtNine.format("MMMM Do, YYYY hh:mm:ss"));
  console.log(todayAtNine.diff(now, "hour"));

  return todayAtNine;
}

// function genTimeObject(militaryHour) {
//   var timeObj = {
//     hour: ((militaryHour > 12) ? (militaryHour - 12) : militaryHour),
//     hourSuffix: ((militaryHour > 11) ? "PM" : "AM")
//   }

//   return timeObj;
// }

// function getTimePeriod(hourToCompare) {
//   var currentHour = now.format("HH");

//   if (currentHour < hourToCompare)
//     return "future";
//   else if (currentHour > hourToCompare)
//     return "past";
//   else
//     return "present";
// }
