// ## Acceptance Criteria

// WHEN I click the save button for that timeblock
// THEN the text for that event is saved in local storage
// WHEN I refresh the page
// THEN the saved events persist

// $(function () {
// TODO: Add a listener for click events on the save button. This code should
// use the id in the containing time-block as a key to save the user input in
// local storage. HINT: What does `this` reference in the click listener
// function? How can DOM traversal be used to get the "hour-x" id of the
// time-block containing the button that was clicked? How might the id be
// useful when saving the description in local storage?
//
// TODO: Add code to get any user input that was saved in localStorage and set
// the values of the corresponding textarea elements. HINT: How can the id
// attribute of each time-block be used to do this?
// });

const currentDay = $("#currentDay");
const timeBlocksDiv = $(".time-blocks");

var saveBtn;
var now = dayjs();

start();

function start() {
  setDate();
  renderTimeBlocks();
}

function setDate() {

  // // "Do" displays today's date with ordinal - requires "advancedFormat" plugin to work
  currentDay.text(now.format("dddd, MMMM Do"));
}

function renderTimeBlocks() {
  var todayAtNine = dayjs(now.format("MM/DD/YYYY ") + "09:00:00");

  for (var i = 0; i < 8; i++) {
    var blockTime = todayAtNine.add(i, "hour");
    var timeDiff = blockTime.diff(now, "hour");
    var id = "hour-" + blockTime.format("H");
    var textAreaVal = JSON.parse(localStorage.getItem(id)) || "";

    timeBlocksDiv.append($(`
      <div id="${id}" class="row time-block ${getTimePeriod(timeDiff)}">
        <div class="col-2 col-md-1 hour text-center py-3">${blockTime.format("h A")}</div>
        <textarea class="col-8 col-md-10 description" rows="3">${textAreaVal}</textarea>
        <button class="btn saveBtn col-2 col-md-1" aria-label="save">
          <i class="fas fa-save" aria-hidden="true"></i>
        </button>
      </div>
    `));
  }
}

function getTimePeriod(timeDiff) {
  if (timeDiff > 0)
    return "future";
  else if (timeDiff < 0)
    return "past";
  else
    return "present";
}

function onSaveBtnClick() {
  var timeBlockID = $(this).parent().attr("id");
  var textAreaVal = $(this).siblings(".description").val();

  if (textAreaVal !== "") {
    localStorage.setItem(timeBlockID, JSON.stringify(textAreaVal));
  }
}

timeBlocksDiv.on("click", ".saveBtn", onSaveBtnClick);
