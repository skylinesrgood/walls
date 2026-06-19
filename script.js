const BOARD_SIZE = 9;

const canvas = document.getElementById("board");
const ctx = canvas.getContext("2d");

let gameMode = "local";

let currentPlayer = 1;

let gameOver = false;

let selectedWallMode = false;

let hoveredCell = null;

const game = {

    p1: {
        x: 4,
        y: 8,
        walls: 10
    },

    p2: {
        x: 4,
        y: 0,
        walls: 10
    },

    horizontalWalls: [],

    verticalWalls: []

};

const menuScreen = document.getElementById("menuScreen");
const gameScreen = document.getElementById("gameScreen");
const winScreen = document.getElementById("winScreen");

const winnerText = document.getElementById("winnerText");

const turnIndicator =
document.getElementById("turnIndicator");

const p1Walls =
document.getElementById("p1Walls");

const p2Walls =
document.getElementById("p2Walls");

document.querySelectorAll(".menuButton")
.forEach(button => {

    button.addEventListener("click", () => {

        gameMode =
        button.dataset.mode;

        startGame();

    });

});

document
.getElementById("playAgain")
.addEventListener("click", () => {

    resetGame();

});

document
.getElementById("backToMenu")
.addEventListener("click", () => {

    winScreen.classList.add("hidden");

    gameScreen.classList.add("hidden");

    menuScreen.classList.remove("hidden");

});

document
.getElementById("menuButton")
.addEventListener("click", () => {

    gameScreen.classList.add("hidden");

    menuScreen.classList.remove("hidden");

});

document
.getElementById("resetButton")
.addEventListener("click", () => {

    resetGame();

});

function startGame(){

    menuScreen.classList.add("hidden");

    gameScreen.classList.remove("hidden");

    resetGame();

}

function resetGame(){

    currentPlayer = 1;

    gameOver = false;

    game.p1.x = 4;
    game.p1.y = 8;
    game.p1.walls = 10;

    game.p2.x = 4;
    game.p2.y = 0;
    game.p2.walls = 10;

    game.horizontalWalls = [];
    game.verticalWalls = [];

    updateUI();

    resizeCanvas();

    draw();

}

function resizeCanvas(){

    const size =
    Math.min(
        window.innerWidth * 0.82,
        window.innerHeight * 0.82
    );

    canvas.width = size;
    canvas.height = size;

}

window.addEventListener(
    "resize",
    () => {

        resizeCanvas();

        draw();

    }
);

function updateUI(){

    p1Walls.textContent =
    `Walls: ${game.p1.walls}`;

    p2Walls.textContent =
    `Walls: ${game.p2.walls}`;

    turnIndicator.textContent =
    currentPlayer === 1
        ? "Player 1 Turn"
        : (
            gameMode === "local"
            ? "Player 2 Turn"
            : "AI Turn"
        );

}

function draw(){

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    drawGoalRows();

    drawGrid();

    drawWalls();

    drawPawns();

}

function drawGoalRows(){

    const tile =
    canvas.width / BOARD_SIZE;

    for(let x=0;x<BOARD_SIZE;x++){

        roundRect(
            x*tile+4,
            4,
            tile-8,
            tile-8,
            10,
            "rgba(255,100,100,.18)"
        );

        roundRect(
            x*tile+4,
            canvas.height-tile+4,
            tile-8,
            tile-8,
            10,
            "rgba(79,255,216,.18)"
        );

    }

}

function drawGrid(){

    const tile =
    canvas.width / BOARD_SIZE;

    for(let y=0;y<BOARD_SIZE;y++){

        for(let x=0;x<BOARD_SIZE;x++){

            roundRect(
                x*tile+4,
                y*tile+4,
                tile-8,
                tile-8,
                10,
                "rgba(40,32,24,.65)"
            );

        }

    }

}

function drawPawns(){

    const tile =
    canvas.width / BOARD_SIZE;

    drawPawn(
        game.p1.x,
        game.p1.y,
        "#47ffe0"
    );

    drawPawn(
        game.p2.x,
        game.p2.y,
        "#ff6d6d"
    );

    function drawPawn(x,y,color){

        const cx =
        x*tile + tile/2;

        const cy =
        y*tile + tile/2;

        ctx.beginPath();

        ctx.arc(
            cx,
            cy,
            tile*0.24,
            0,
            Math.PI*2
        );

        ctx.fillStyle = color;

        ctx.shadowBlur = 18;

        ctx.shadowColor = color;

        ctx.fill();

        ctx.shadowBlur = 0;

    }

}

function drawWalls(){

    const tile =
    canvas.width / BOARD_SIZE;

    ctx.lineCap = "round";

    game.horizontalWalls.forEach(w => {

        ctx.strokeStyle =
        "#ff6d6d";

        ctx.lineWidth =
        tile*0.14;

        ctx.beginPath();

        ctx.moveTo(
            w.x*tile + tile,
            w.y*tile + tile
        );

        ctx.lineTo(
            w.x*tile + tile*3,
            w.y*tile + tile
        );

        ctx.stroke();

    });

    game.verticalWalls.forEach(w => {

        ctx.strokeStyle =
        "#47ffe0";

        ctx.lineWidth =
        tile*0.14;

        ctx.beginPath();

        ctx.moveTo(
            w.x*tile + tile,
            w.y*tile + tile
        );

        ctx.lineTo(
            w.x*tile + tile,
            w.y*tile + tile*3
        );

        ctx.stroke();

    });

}

function roundRect(
    x,
    y,
    width,
    height,
    radius,
    color
){

    ctx.beginPath();

    ctx.moveTo(x+radius,y);

    ctx.lineTo(
        x+width-radius,
        y
    );

    ctx.quadraticCurveTo(
        x+width,
        y,
        x+width,
        y+radius
    );

    ctx.lineTo(
        x+width,
        y+height-radius
    );

    ctx.quadraticCurveTo(
        x+width,
        y+height,
        x+width-radius,
        y+height
    );

    ctx.lineTo(
        x+radius,
        y+height
    );

    ctx.quadraticCurveTo(
        x,
        y+height,
        x,
        y+height-radius
    );

    ctx.lineTo(
        x,
        y+radius
    );

    ctx.quadraticCurveTo(
        x,
        y,
        x+radius,
        y
    );

    ctx.closePath();

    ctx.fillStyle = color;

    ctx.fill();

}

/* =========================
   WALL SYSTEM V1
========================= */

let wallMode = false;

let wallDirection = "horizontal";

document.addEventListener("keydown", e => {

    if(e.key.toLowerCase() === "w"){

        wallMode = !wallMode;

        draw();

    }

    if(e.key.toLowerCase() === "r"){

        wallDirection =
        wallDirection === "horizontal"
        ? "vertical"
        : "horizontal";

        draw();

    }

});

/* =========================
   CLICK OVERRIDE
========================= */

const oldHandleClick =
handleClick;

handleClick = function(e){

    if(gameOver) return;

    const rect =
    canvas.getBoundingClientRect();

    const tile =
    canvas.width / BOARD_SIZE;

    const x =
    Math.floor(
        (e.clientX - rect.left) / tile
    );

    const y =
    Math.floor(
        (e.clientY - rect.top) / tile
    );

    if(wallMode){

        attemptWallPlacement(x,y);

        return;

    }

    attemptMove(x,y);

};

/* =========================
   WALL PLACEMENT
========================= */

function attemptWallPlacement(x,y){

    const player =
    currentPlayer === 1
    ? game.p1
    : game.p2;

    if(player.walls <= 0){

        return;

    }

    if(wallDirection === "horizontal"){

        if(hasHorizontalWall(x,y))
            return;

        game.horizontalWalls.push({

            x,
            y

        });

    }
    else{

        if(hasVerticalWall(x,y))
            return;

        game.verticalWalls.push({

            x,
            y

        });

    }

    player.walls--;

    updateUI();

    draw();

    endTurn();

}

/* =========================
   WALL LOOKUPS
========================= */

function hasHorizontalWall(x,y){

    return game.horizontalWalls.some(

        wall =>

        wall.x === x &&
        wall.y === y

    );

}

function hasVerticalWall(x,y){

    return game.verticalWalls.some(

        wall =>

        wall.x === x &&
        wall.y === y

    );

}

/* =========================
   PREVIEW
========================= */

const oldDraw =
draw;

draw = function(){

    oldDraw();

    drawWallPreview();

};

function drawWallPreview(){

    if(
        !wallMode ||
        !hoveredCell
    ){
        return;
    }

    const tile =
    canvas.width / BOARD_SIZE;

    ctx.strokeStyle =
    "rgba(255,255,255,.5)";

    ctx.lineWidth =
    tile * 0.14;

    ctx.lineCap =
    "round";

    if(
        wallDirection ===
        "horizontal"
    ){

        ctx.beginPath();

        ctx.moveTo(
            hoveredCell.x * tile + tile,
            hoveredCell.y * tile + tile
        );

        ctx.lineTo(
            hoveredCell.x * tile + tile*3,
            hoveredCell.y * tile + tile
        );

        ctx.stroke();

    }
    else{

        ctx.beginPath();

        ctx.moveTo(
            hoveredCell.x * tile + tile,
            hoveredCell.y * tile + tile
        );

        ctx.lineTo(
            hoveredCell.x * tile + tile,
            hoveredCell.y * tile + tile*3
        );

        ctx.stroke();

    }

}
