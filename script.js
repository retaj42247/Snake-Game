//board
let blockSize = 25;
var rows = 20;
var cols = 20;
var board;
var context;


//snake head
var snakeX = blockSize * 5;
var snakeY = blockSize * 5;

var velocityX = 0;
var velocityY = 0;

var snakeBody = [];

var gameOver = false;

//food
var foodX;
var foodY;

var score = 0;
 
window.onload = function() {
    board = document.getElementById("board");
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    context = board.getContext("2d");
    
    //Mobile swipe controls
let touchStartX = 0;
let touchStartY = 0;

document.addEventListener("touchstart", function(e) {
  touchStartX = e.changedTouches[0].screenX;
  touchStartY = e.changedTouches[0].screenY;
}, { passive: true });

document.addEventListener("touchend", function(e) {
  touchEndX = e.changedTouches[0].screenX;
  touchEndY = e.changedTouches[0].screenY;
  
  let diffX = touchEndX - touchStartX;
  let diffY = touchEndY - touchStartY;
  
  if (Math.abs(diffX) < 20 && Math.abs(diffY) < 20) {
    return;
  }
  
  if (Math.abs(diffX) > Math.abs(diffY)) {
    if (diffX > 0 && velocityX !== -1) {
      velocityX = 1;
      velocityY = 0;
    } else if (diffX < 0 && velocityX !== 1) {
      velocityX = -1;
      velocityY = 0;
    }
  } else {
    if (diffY > 0 && velocityY !== -1) {
      velocityX = 0;
      velocityY = 1;
    } else if (diffY < 0 && velocityY !== 1) {
      velocityX = 0;
      velocityY = -1;
    }
  }
}, { passive: true });
    
  document.getElementById("gameOverScreen").addEventListener("click",
    function() {
    location.reload();
  });
    
    placeFood();
    document.addEventListener("keyup", changeDirection);
    //update();
    setInterval(update, 1000/10);
}

function update() {
  if (gameOver) {
    return
  }
  context.fillStyle = "#010A27";
  context.fillRect(0, 0, board.width, board.height);
  
  context.fillStyle = "red";
  context.fillRect(foodX, foodY, blockSize, blockSize);
  
  if(foodX == snakeX && foodY == snakeY) {
    snakeBody.push([foodX, foodY]);
    score++;
    placeFood();
  }
  
      for (let i = snakeBody.length - 1; i > 0; i--) {
      snakeBody[i] = snakeBody[i - 1];
    }
    
    if (snakeBody.length > 0) {
      snakeBody[0] = [snakeX, snakeY];
    }
  
  context.fillStyle="lime";
  snakeX += velocityX * blockSize;
  snakeY += velocityY * blockSize;
  
  //wrap around the board edges
  snakeX = (snakeX + cols * blockSize) % (cols * blockSize);
  snakeY = (snakeY + rows * blockSize) % (rows * blockSize);
  
  context.fillRect(snakeX, snakeY, blockSize, blockSize);
  for(let i = 0; i < snakeBody.length; i++) {
    context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
  }
  
//game over conditions
for(let i = 0; i < snakeBody.length; i++) {
  if(snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
    gameOver = true;
    
    document.getElementById("finalScore").textContent = "Score: " + score;
    
    document.getElementById("gameOverScreen").style.display="block";
  }
}
}

function changeDirection(e) {
  if(e.code == "ArrowUp" && velocityY != 1) {
    velocityX = 0;
    velocityY = -1;
  }
  else if (e.code == "ArrowDown" && velocityY != -1) {
    velocityX = 0;
    velocityY = 1;
  }
  else if (e.code == "ArrowLeft" && velocityX != 1) {
    velocityX = -1;
    velocityY = 0;
  }
  else if (e.code == "ArrowRight" && velocityX != -1) {
    velocityX = 1;
    velocityY = 0;
  }
}

 function placeFood() {
  foodX = Math.floor(Math.random() * cols) * blockSize;
  foodY = Math.floor(Math.random() * rows) * blockSize;
 }

