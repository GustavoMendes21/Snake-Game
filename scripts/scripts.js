const canvas = document.getElementById("snake");
const context = canvas.getContext("2d");
const box = 32;

const snake = []
snake[0] = {
    x: 8 * box,
    y: 8 * box
}

let direction = ""
let food = {
    x: Math.floor(Math.random() * 15 + 1) *box,
    y: Math.floor(Math.random() * 15 + 1) *box,  
}

function createBG() {
    context.fillStyle = "lightgreen";
    context.fillRect(0,0,16*box,16*box)
}

function createSnake() {
    for(i=0; i < snake.length; i++) {
        context.fillStyle = "#3c009c"
        context.fillRect(snake[i].x, snake[i].y, box, box)
    }
}

function drawFood() {
    context.fillStyle = "red"
    context.fillRect(food.x, food.y, box, box);
}



document.addEventListener("keydown", btn => {
    if(btn.key == "a" && direction != "right") direction = "left"
    if(btn.key == "d" && direction != "left") direction = "right"
    if(btn.key == "w" && direction != "down") direction = "up"
    if(btn.key == "s" && direction != "up") direction = "down"
});

function initGame() {
    
    
    if (snake[0].x > 15*box && direction == "right") snake[0].x = 0;
    if (snake[0].x < 0 && direction == "left") snake[0].x = 16*box;
    if (snake[0].y > 15*box && direction == "down") snake[0].y = 0;
    if (snake[0].y < 0 && direction == "up") snake[0].y = 16*box;
    
    for(i = 1; i < snake.length; i++){
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
            clearInterval(gameInterval)
            alert("Game Over, para reinciar recarregue a página")
        }
    }

    createBG();
    createSnake();
    drawFood()
    
    let snakeX = snake[0].x
    let snakeY = snake[0].y

    if(direction == "right") snakeX += box;
    if(direction == "left") snakeX -= box;
    if(direction == "up") snakeY -= box;
    if(direction == "down") snakeY += box;

    if(snakeX != food.x || snakeY != food.y){
        snake.pop();
    }else{
        food.x =  Math.floor(Math.random() * 15 + 1) *box;
        food.y =  Math.floor(Math.random() * 15 + 1) *box;
        
    }

    let newHead = {
        x: snakeX,
        y: snakeY,
    }

    snake.unshift(newHead)
}

const gameInterval = setInterval(initGame, 100);
