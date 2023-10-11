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

// run onBlur (user selects something else than this tab), log time to local storage
// run onFocus (user goes back to this tab), test current time see if hour/day has changed, and re-render if necessary
// attach eventListener to both onBlur or onFocus? Or just to document and do event delegation?

const wind = $(window);
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
  // delete all previous time blocks here

  var todayAtNine = getTodayAtNine();

  for (var i = 0; i < 8; i++) {
    var blockTime = todayAtNine.add(i, "hour");

    // console.log("blockTime: " + blockTime.format("dddd MMMM Do, YYYY H:mm"));

    var timeDiff = blockTime.diff(now, "hour");

    // console.log("timeDiff: " + timeDiff);

    timeBlocksDiv.append($(`
      <div id="hour-${blockTime.format("H")}" class="row time-block ${getTimePeriod(timeDiff)}">
        <div class="col-2 col-md-1 hour text-center py-3">${blockTime.format("h A")}</div>
        <textarea class="col-8 col-md-10 description" rows="3"> </textarea>
        <button class="btn saveBtn col-2 col-md-1" aria-label="save">
          <i class="fas fa-save" aria-hidden="true"></i>
        </button>
      </div>
    `));
  }
}

// checks to see if hour/date has changed, redraws time blocks/date if so
function hourCheck() {

  // new hour, redraw time blocks
  if (now.format("mm:ss") === "00:00") {
    renderTimeBlocks();

    console.log("new hour detected. Redrawing time blocks!");

    // midnight, new day - update date at top of screen
    if (now.format("HH") === "00") {
      setDate();

      console.log("new day detected. Changing date at top of screen!");
    }
  }
}

function getTodayAtNine() {
  var diffFromNine = now.format("H") - 9;
  var todayAtNine = dayjs().add((diffFromNine * -1), 'hour');
  return todayAtNine;
}

function getTimePeriod(timeDiff) {
  if (timeDiff > 0)
    return "future";
  else if (timeDiff < 0)
    return "past";
  else
    return "present";
}

function onBlur() {
  localStorage.setItem("blurTime", JSON.stringify(now));
  console.log("onBlur fired");
}

function onFocus() {
  console.log("onFocus fired");
  var blurTime = JSON.parse(localStorage.getItem("blurTime")) || undefined;

  console.log(blurTime);

  if (blurTime !== undefined) {
    now = dayjs();
    var diff = now.diff(blurTime, "hour");

    if (diff !== 0) {
      console.log("blurTime and now are different hours! Re-rendering bars!");
      renderTimeBlocks();

      if (diff < 0) {
        setDate();
        console.log("now is now earlier than blurTime. New day detected!");
      }
    }
  }

}

wind.on("blur", onBlur);
wind.on("focus", onFocus);
