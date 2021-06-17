const canvas = document.getElementById("game")
const ctx = canvas.getContext("2d")

const background = new Image()
background.src = "img/background.png"

const foodImage = new Image()
foodImage.src = "img/food.png"

let box = 24

let score = 0

let food = {
    x: Math.floor(Math.random() * 20) * box,
    y: Math.floor(Math.random() * 12) * box
}

let snake = []
snake[0] = {
    x: 9 * box, 
    y: 5 * box
}

document.addEventListener("keydown", direction)

let dir

function direction(event){
    if(event.keyCode == 37 && dir != "right")
        dir = "left"
    else if(event.keyCode == 38 && dir != "down")
        dir = "up"
    else if(event.keyCode == 39 && dir != "left")
        dir = "right"
    else if(event.keyCode == 40 && dir != "up")
        dir = "down"
}   

function eatSelf(head, arr) {
    for(let i = 0; i < arr.length; i++){
        if(head.x == arr[i].x && head.y == arr[i].y)
            clearInterval(game)
    }
}

function drawGame(){
    ctx.drawImage(background,0,0)

    ctx.drawImage(foodImage, food.x, food.y)

    for(let i = 0; i< snake.length;i ++){
        ctx.fillStyle = "green"
        ctx.fillRect(snake[i].x,snake[i].y, box ,box)
    }

    ctx.fillStyle = "white"
    ctx.font = "20px Arial"
    ctx.fillText(score, box , box)

    let snakeX = snake[0].x
    let snakeY = snake[0].y

    if(snakeX == food.x && snakeY == food.y){
        score++
        food = {
            x: Math.floor(Math.random() * 20) * box,
            y: Math.floor(Math.random() * 12) * box
        }
    } else {
        snake.pop()
    } 

    if (snakeX < box || snakeX > box * 20 || snakeY < box || snakeY > box * 12){
        clearInterval(game)
    }

    if(dir == "left") snakeX -= box
    if(dir == "right") snakeX += box
    if(dir == "up") snakeY -= box
    if(dir == "down") snakeY += box

    let newHead = {
        x: snakeX,
        y: snakeY
    }

    eatSelf(newHead,snake)


    snake.unshift(newHead)
    
}

//display image 
let game = setInterval(drawGame,100)