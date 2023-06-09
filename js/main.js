let storageData = JSON.parse(localStorage.getItem("Player")) || [ ];
let seconds = 0;
let minutes = 0;
let name;
let timer;
let best_board = document.querySelector(".players-list");
let li = document.createElement("li")
let storageTime;


function startTimer () {
  timer = setInterval(() => {
    seconds++;
    if (seconds === 60) {
      seconds = 0;
      minutes++;
    }
    document.getElementById("timer").textContent = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  }, 1000);
}

function stopTimer() {
  clearInterval(timer);
}

function createValues(value) {
  let li = document.createElement("li");
  li.innerHTML = value;
  return li;
}

function generateList(values) {
  if (values.length > 5) {
    storageData.splice(values.length - 1);
    localStorage.setItem("Player", JSON.stringify(storageData));
  }
  for (let i = 0; i < values.length; i++) {
    let li = createValues(values[i]);
    best_board.appendChild(li);
  }
}

function addList(list) {
  storageData.unshift(list);

  best_board.insertAdjacentElement("afterbegin", createValues(list));

  localStorage.setItem("Player", JSON.stringify(storageData));
}

generateList(storageData.sort())

function rect(color, x, y, width, height) {
  this.color = color;
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.draw = function () {
    context.fillStyle = this.color;
    context.fillRect(this.x, this.y, this.width, this.height);
  };
}

function createCircle(color, x, y, radius, startAngle, endAngle, anticlockwise) {
  this.color = color;
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.startAngle = startAngle;
  this.endAngle = endAngle;
  this.ananticlockwise =anticlockwise;
  this.draw = function () {
    context.beginPath();
    context.arc(this.color, this.x, this.y, this.radius, this.startAngle, this.endAngle, this.ananticlockwise)
    context.stroke();
    context.fillStyle = this.color;
  }
}

function collision(objA, objB) {
  if (
    objA.x + objA.width > objB.x &&
    objA.x < objB.x + objB.width &&
    objA.y + objA.height > objB.y &&
    objA.y < objB.y + objB.height
  ) {
    return true;
  } else {
    return false;
  }
}

function aiMove() {
  var y;
  switch (ball.vY) {
    case 2:
      vY = 2;
      break;
    case 3:
      vY = 3;
      break;
    case 4:
      vY = 4;
      break;
    case 5:
      vY = 5;
      break;
    case 6:
      vY = 5;
      break;
    case 7:
      vY = 6;
      break;
    case 8:
      vY = 6;
      break;
    case 9:
      vY = 6;
      break;
    case 0:
      vY = 0;
      break;
  }

  if (ball.y < ai.y + ai.height / 2) {
    y = ai.y - vY;
  }
  if (ball.y > ai.y + ai.height / 2) {
    y = ai.y + vY;
  }
  if (10 < y && y < game.height - ai.height - 10) {
    ai.y = y;
  }
}

function playerMove(e) {
  if (start) {
    var y = e.pageY;
    if (
      player.height / 2 + 10 < y &&
      y < game.height - player.height / 2 - 10
    ) {
      player.y = y - player.height / 2;
    }
  }
}

function startGame() {
  if (!start) {
    start = true;
    ball.vX = -2;
    ball.vY = 2;
    startTimer();
  }
  minutes = 0;
  seconds =  0;
}

function draw() {
  game.draw();

  for (var i = 10; i < game.height; i += 45) {
    context.fillStyle = "#ccc";
    context.fillRect(game.width / 2 - 10, i, 20, 30);
  }
  context.font = "bold 128px courier";
  context.textAlign = "center";
  context.textBaseline = "top";
  context.fillStyle = "#ccc";
  context.quadraticCurveTo(25,100,50,100);
  context.fillText(ai.scores, 100, 0);
  context.fillText(player.scores, game.width - 100, 0);
  ai.draw();
  player.draw();
  ball.draw();
  if (!start) {
    context.fillStyle = "#ccc";
    context.globalAlpha = 0.7;
    context.fillRect(0, 0, game.width, game.height);
    context.font = "bold 16px courier";
    context.textBaseline = "top";
    context.fillStyle = "#000";
    context.fillText(
      "Total: " + game.total + " Win: " + game.win + " Lose: " + game.lose,
      game.width / 2,
      0
    );
    context.font = "bold 60px courier";
    context.textBaseline = "top";
    context.fillStyle = "#000";
    context.fillText("canvasPong", game.width / 2, game.height / 2 - 50);
    context.font = "bold 16px courier";
    context.textBaseline = "top";
    context.fillStyle = "#000";
    context.fillText("click on me", game.width / 2, game.height / 2 + 25);
    context.textBaseline = "bottom";
  }
}

function update() {
  aiMove();

  if (ball.y < 0 || ball.y + ball.height > game.height) {
    ball.vY = -ball.vY;
  }
  if (ball.x < 0) {
    ball.vX = -ball.vX;
    player.scores++;
  }
  if (ball.x + ball.width > game.width) {
    ball.vX = -ball.vX;
    ai.scores++;
  }

  if (ai.scores === 10 || player.scores === 10) {
    if (ai.scores === 10) {
      game.lose++;
      start = false;
      ball.x = game.width - player.width - 1.5 * ball.width - 10;
      ball.y = game.height / 2 - ball.width / 2;
      ai.y = game.height / 2 - ai.height / 2;
      player.y = game.height / 2 - ai.height / 2;
      stopTimer();
    } else {
      game.win++;
      start = false;
      ball.x = player.width + ball.width;
      ball.y = game.height / 2 - ball.width / 2;
      ai.y = game.height / 2 - ai.height / 2;
      player.y = game.height / 2 - ai.height / 2;
      stopTimer();
      addList(`${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`);
      window.location.reload();
    }
    ball.vX = 0;
    ball.vY = 0;
    ai.scores = 0;
    player.scores = 0;
    game.total++;
  }
  
  if (
    (collision(ai, ball) && ball.vX < 0) ||
    (collision(player, ball) && ball.vX > 0)
  ) {
    if (ball.vX < 9 && -9 < ball.vX) {
      if (ball.vX < 0) {
        ball.vX--;
      } else {
        ball.vX++;
      }
      if (ball.vY < 0) {
        ball.vY--;
      } else {
        ball.vY++;
      }
    }
    ball.vX = -ball.vX;
  }
  ball.x += ball.vX;
  ball.y += ball.vY;
}

function play() {
  draw();
  update();
}

function init() {
  start = false;
  game = new rect("#000", 0, 0, 480, 320);
  game.total = 0;
  game.win = 0;
  game.lose = 0;
  ai = new rect("#ff0000", 10, game.height / 2 - 40, 20, 80);
  player = new rect("#00ff00", game.width - 30, game.height / 2 - 40, 20, 80);
  ai.scores = 0;
  player.scores = 0;
  ball = new createCircle("yellow", 40, game.height, 10, 0.2 * Math.PI, false);
  ball = new rect("#00ffff", 40, game.height / 2 - 10, 20, 20);
  ball.vX = 0;
  ball.vY = 0;
  var canvas = document.getElementById("pong");
  canvas.width = game.width;
  canvas.height = game.height;
  context = canvas.getContext("2d");
  canvas.onmousemove = playerMove;
  canvas.onclick = startGame;
  setInterval(play, 1000 / 50);
}

init();


