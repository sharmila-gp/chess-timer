var playerABtn = document.getElementById("A");
var playerBBtn = document.getElementById("B");
var playerAText = document.getElementById("playerA");
var playerBText = document.getElementById("playerB");
var startBtn = document.getElementById("start");
var dualBtn = document.getElementById("dual"); //pause
var resetBtn = document.getElementById("reset");
var checkBtn = document.getElementById("check");

var playbtnA = playerABtn.getAttribute("data-start");
var playbtnB = playerBBtn.getAttribute("data-start");

var start = startBtn.getAttribute("data-start");
var pause = dualBtn.getAttribute("data-pause");
var reset1 = resetBtn.getAttribute("data-start");
var check = checkBtn.getAttribute("data-check");

var defaulttime = new Date(0, 0, 0, 0, 0, 0, 0);
var playerAtimer = new Date(0, 0, 0, 0, 15, 0, 0);
var playerBtimer = new Date(0, 0, 0, 0, 15, 0, 0);
var playerAvalue = 0;
var playerBvalue = 0;
var playerAarray = [];
var playerBarray = [];



startBtn.addEventListener("click", () => {
  readInput();
  playerBBtn.setAttribute("data-start", "start");
  startBtn.setAttribute("data-start", "start");
});

resetBtn.addEventListener("click", () => {
  resetTime();
});

playerABtn.addEventListener("click", () => {
  playerABtn.setAttribute("data-start", "start");
  playerBBtn.setAttribute("data-start", "stop");
});

playerBBtn.addEventListener("click", () => {
  playerBBtn.setAttribute("data-start", "start");
  playerABtn.setAttribute("data-start", "stop");
});

dualBtn.addEventListener("click", function () {
  var state = dualBtn.getAttribute("data-pause");
  if (state == "resume") {
    dualBtn.setAttribute("data-pause", "pause");
    dualBtn.innerText = "Resume";
  } else if (state == "pause") {
    dualBtn.setAttribute("data-pause", "resume");
    dualBtn.innerText = "Pause";
  }
});

checkBtn.addEventListener("click", () => {
  playbtnA = playerABtn.getAttribute("data-start");
  playbtnB = playerBBtn.getAttribute("data-start");
  
  if (playbtnA == "start") {
    resetTime();
    playerBText.value = "U Win";
    playerAText.value = "Over";
  }
  if (playbtnB == "start") {
    resetTime();
    playerAText.value = "U Win";
    playerBText.value = "Over";
  }
});

function resetTime() {
  playerABtn.setAttribute("data-start", "stop");
  playerBBtn.setAttribute("data-start", "stop");
  startBtn.setAttribute("data-start", "stop");
  checkBtn.setAttribute("data-check", "stop");
  dualBtn.setAttribute("data-pause", "resume");
  playerAtimer = new Date(0, 0, 0, 0, 15, 0, 0);
  playerBtimer = new Date(0, 0, 0, 0, 15, 0, 0);
  settime();
}
function parse(number) {
  if (number < 10) {
    return "0" + number;
  } else {
    return number;
  }
}

function settime() {
  playerAText.value =
    parse(playerAtimer.getMinutes()) + ":" + parse(playerAtimer.getSeconds());
  playerBText.value =
    parse(playerBtimer.getMinutes()) + ":" + parse(playerBtimer.getSeconds());
}

function readInput() {
  playerAvalue = playerAText.value;
  playerBvalue = playerBText.value;
  playerAarray = playerAvalue.split(":");
  playerBarray = playerBvalue.split(":");
  playerAtimer = new Date(0, 0, 0, 0, playerAarray[0], playerAarray[1], 0);
  playerBtimer = new Date(0, 0, 0, 0, playerBarray[0], playerBarray[1], 0);
  settime();
}
function timerFunction() {
  playbtnA = playerABtn.getAttribute("data-start");
  playbtnB = playerBBtn.getAttribute("data-start");
  pause = dualBtn.getAttribute("data-pause");
  start = startBtn.getAttribute("data-start");

  if (start == "start" && pause == "resume") {
    if (playbtnA == "start") {
      playerBtimer = new Date(playerBtimer.getTime() - 1000);
      settime();
    }
    if (playerBtimer.getTime() <= defaulttime.getTime()) {
      resetTime();
      playerAText.value = "U Win";
      playerBText.value = "Over";
    }

    if (playbtnB == "start") {
      playerAtimer = new Date(playerAtimer.getTime() - 1000);
      settime();
    }
    if (playerAtimer.getTime() <= defaulttime.getTime()) {
      resetTime();
      playerBText.value = "U Win";
      playerAText.value = "Over";
    }
  }
}

setInterval(timerFunction, 1000);
resetTime();
