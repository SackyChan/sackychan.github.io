function rand (max) {
    return Math.floor(Math.random() * max);
}

function shuffle(a){
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

function changeBrightness(factor, sprite) {
    let virtCanvas = document.createElement("canvas");
    virtCanvas.width = 500;
    virtCanvas.height = 500;
    let context = virtCanvas.getContext("2d");
    context.drawImage(sprite, 0, 0, 500, 500);

    let imgData = context.getImageData(0, 0, 500, 500);

    for (let i = 0; i < imgData.data.length; i += 4) {
        imgData.data[i] =  imgData.data[i] * factor;
        imgData.data[i + 1] = imgData.data[i + 1] * factor;
        imgData.data[i + 2] = imgData.data[i + 2] * factor;
    }
    context.putImageData(imgData, 0, 0);

    let spriteOutput = new Image();
    spriteOutput.src = virtCanvas.toDataURL();
    virtCanvas.remove();
    return spriteOutput;
}

function displayVictoryMessage(moves) {
    document.getElementById("moves").innerHTML = "You completed the maze in " + moves + " moves!";
    toggleVisibility("messageContainer");
}

function toggleVisibility(id) {
    let element = document.getElementById(id);
    if (element) {
        if (element.style.visibility == "hidden") {
            element.style.visibility = "visible";
        } else {
            element.style.visibility = "hidden";
        }
    } else {
        console.error(`Element with id "${id}" not found.`);
    }
}

function Maze(width, height) {
    let mazeMap;
    let mazeWidth = width;
    let mazeHeight = height;
    let startCoord, endCoord;
    let dirs = ["N", "S", "E", "W"];
    let modDir = {
        N: {x: 0, y: -1, o: "S"},
        S: {x: 0, y: 1, o: "N"},
        E: {x: 1, y: 0, o: "W"},
        W: {x: -1, y: 0, o: "E"}
    };
    this.map = function() {
        return mazeMap;
    };
    this.startCoord = function() {
        return startCoord;
    };
    this.endCoord = function() {
        return endCoord;
    };

    function genMap() {
        mazeMap = new Array(mazeHeight);
        for (let y = 0; y < mazeHeight; y++) {
            mazeMap[y] = new Array(mazeWidth);
            for (let x = 0; x < mazeWidth; x++) {
                mazeMap[y][x] = {
                    N: false, 
                    S: false, 
                    E: false, 
                    W: false, 
                    visited: false, 
                    priorPos: null};
            }
        }
    }

    function defineMaze() {
        var isComp = false;
        var move = false;
        var cellsVisited = 1;
        var numLoops = 0;
        var maxLoops = 0;
        var position = {
            x: 0,
            y: 0
        };
        var numCells = width * height;
        while (!isComp) {
            move = false;
            mazeMap[position.y][position.x].visited = true;

            if (numLoops >= maxLoops) {
                shuffle(dirs);
                maxLoops = Math.round(rand(height / 8));
                numLoops = 0;
            }
            numLoops++;
            for (var index = 0; index < dirs.length; index++) {
                var direction = dirs[index];
                var nx = position.x + modDir[direction].x;
                var ny = position.y + modDir[direction].y;

                if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
                    // Check if the tile is already visited
                    if (!mazeMap[ny][nx].visited) {
                        // Carve through walls from this tile to next
                        mazeMap[position.y][position.x][direction] = true;
                        mazeMap[ny][nx][modDir[direction].o] = true;

                        // Debugging: Log wall removal
                        console.log(`Removed wall between (${position.x}, ${position.y}) and (${nx}, ${ny})`);

                        // Set Currentcell as next cells Prior visited
                        mazeMap[ny][nx].priorPos = position;
                        // Update Cell position to newly visited location
                        position = {
                            x: nx,
                            y: ny
                        };
                        cellsVisited++;
                        // Recursively call this method on the next tile
                        move = true;
                        break;
                    }
                }
            }

            if (!move) {
                // If it failed to find a direction,
                // move the current position back to the prior cell and Recall the method.
                if (mazeMap[position.y][position.x].priorPos) {
                    position = mazeMap[position.y][position.x].priorPos;
                } else {
                    // If there is no prior position, break the loop to avoid infinite loop
                    break;
                }
            }
            if (numCells == cellsVisited) {
                isComp = true;
            }
        }
    }

    function defineStartEnd() {
        switch (rand(4)) {
            case 0:
                startCoord = {
                    x: 0,
                    y: 0
                };
                endCoord = {
                    x: height - 1,
                    y: width - 1
                };
                break;
            case 1:
                startCoord = {
                    x: 0,
                    y: width - 1
                };
                endCoord = {
                    x: height - 1,
                    y: 0
                };
                break;
            case 2:
                startCoord = {
                    x: height - 1,
                    y: 0
                };
                endCoord = {
                    x: 0,
                    y: width - 1
                };
                break;
            case 3:
                startCoord = {
                    x: height - 1,
                    y: width - 1
                };
                endCoord = {
                    x: 0,
                    y: 0
                };
                break;
        }
    }

    genMap();
    defineStartEnd();
    defineMaze();
}

function drawMaze(Maze, ctx, cellsize, endSprite = null){
    let map = Maze.map();
    let cellSize = cellsize;
    let drawEndMethod;
    ctx.lineWidth = cellSize / 40;

    this.redrawMaze = function(size){
        cellSize = size;
        ctx.lineWidth = cellSize / 50;
        drawMap();
        drawEndMethod();
    };

    function drawCell(xCord, yCord, cell){
        let x = xCord * cellSize;
        let y = yCord * cellSize;
        if (cell.N == false){
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x + cellSize, y);
            ctx.stroke();
        }
        if (cell.S == false){
            ctx.beginPath();
            ctx.moveTo(x, y + cellSize);
            ctx.lineTo(x + cellSize, y + cellSize);
            ctx.stroke();
        }
        if (cell.E == false){
            ctx.beginPath();
            ctx.moveTo(x + cellSize, y);
            ctx.lineTo(x + cellSize, y + cellSize);
            ctx.stroke();
        }
        if (cell.W == false){
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x, y + cellSize);
            ctx.stroke();
        }
    }

    function drawMap(){
        for (let y = 0; y < map.length; y++){
            for (let x = 0; x < map[y].length; x++){
                drawCell(x, y, map[y][x]);
            }
        }
    }

    function drawEndFlag() {
        let coord = Maze.endCoord();
        let gridSize = 4;
        let fraction = cellSize / gridSize - 2;
        let colorSwap = true;
        for (let y = 0; y < gridSize; y++) {

            if (gridSize % 2 == 0) {
                colorSwap = !colorSwap;
            }
            for (let x = 0; x < gridSize; x++) {
                ctx.beginPath();
                ctx.rect(coord.x * cellSize + x * fraction + 4.5, coord.y * cellSize + y * fraction + 4.5, fraction, fraction);
                if (colorSwap) {
                    ctx.fillStyle = "black";
                    ctx.fill();
                }
                else {
                    ctx.fillStyle = "white";
                    ctx.fill();
                }
                ctx.fill();
                colorSwap = !colorSwap;
            }
        }
    }

    function drawEndSprite() {
        let offsetLeft = cellSize / 50;
        let offsetRight = cellSize / 25;
        let coord = Maze.endCoord();
        ctx.drawImage(endSprite, 2, 2, endSprite.width, endSprite.height, 
            coord.x * cellSize + offsetLeft, coord.y * cellSize + offsetLeft, 
            cellSize - offsetRight, cellSize - offsetRight);
    }

    function clear() {
        let canvasSize = cellSize * map.length;
        ctx.clearRect(0, 0, canvasSize, canvasSize);
    }

    if (endSprite != null) {
        drawEndMethod = drawEndSprite;
    }
    else {
        drawEndMethod = drawEndFlag;
    }
    clear();
    drawMap();
    drawEndMethod();
}

function Player(maze, c, _cellsize, onComplete, sprite = null){
    let ctx = c.getContext("2d");
    let drawSprite;
    let moves = 0;
    drawSprite = drawSpriteCircle;
    if (sprite != null) {
        drawSprite = drawSpriteImage;
    }
    let player = this;
    let map = maze.map();
    let cellCoords = {x: maze.startCoord().x, y: maze.startCoord().y};
    let cellSize = _cellsize;
    let halfCell = cellSize / 2;

    this.redrawPlayer = function(_cellsize){
        cellSize = _cellsize;
        drawSprite(cellCoords);
    }

    function drawSpriteCircle(coord){
        ctx.beginPath();
        ctx.fillStyle = "yellow";
        ctx.arc((coord.x + 1) * cellSize - halfCell, 
        (coord.y + 1) * cellSize - halfCell, halfCell - 2, 0, 2 * Math.PI);
        ctx.fill();
        if (coord.x == maze.endCoord().x && coord.y == maze.endCoord().y){
            onComplete(moves);
            player.unbindKeyDown();
        }
    }

    function drawSpriteImage(coord){
        let offsetLeft = cellSize / 50;
        let offsetRight = cellSize / 25;
        ctx.drawImage(sprite, 0, 0, sprite.width, sprite.height, 
            coord.x * cellSize + offsetLeft, coord.y * cellSize + offsetLeft, cellSize - offsetRight, cellSize - offsetRight);
        if (coord.x == maze.endCoord().x && coord.y == maze.endCoord().y){
            onComplete(moves);
            player.unbindKeyDown();
        }
    }

    function removeSprite(coord){
        let offsetLeft = cellSize / 50;
        let offsetRight = cellSize / 25;
        ctx.clearRect(coord.x * cellSize + offsetLeft, coord.y * cellSize + offsetLeft, cellSize - offsetRight, cellSize - offsetRight);
    }

    function check(e){
        let cell = map[cellCoords.y][cellCoords.x];
        moves++;
        switch(e.keyCode){
            case 65:
            case 37:
                if (cell.W == true){
                    removeSprite(cellCoords);
                    cellCoords.x--;
                    drawSprite(cellCoords);
                }
                break;
            case 87:
            case 38:
                if (cell.N == true){
                    removeSprite(cellCoords);
                    cellCoords.y--;
                    drawSprite(cellCoords);
                }
                break;
            case 68:
            case 39:
                if (cell.E == true){
                    removeSprite(cellCoords);
                    cellCoords.x++;
                    drawSprite(cellCoords);
                }
                break;
            case 83:
            case 40:
                if (cell.S == true){
                    removeSprite(cellCoords);
                    cellCoords.y++;
                    drawSprite(cellCoords);
                }
                break;
        }
    }

    this.bindKeyDown = function(){
        window.addEventListener("keydown", check, false);
    }

    this.unbindKeyDown = function(){
        window.removeEventListener("keydown", check, false);
    }

    drawSprite(maze.startCoord());

    this.bindKeyDown();
}

let mazeCanvas = document.getElementById("mazeCanvas");
let ctx = mazeCanvas.getContext("2d");
let sprite;
let finishSprite;
let maze, draw, player;
let cellSize;
let difficulty;
// sprite.src = "resources/maze_ghost.png";

window.onload = function(){
    let viewWidth = $("#view").width();
    let viewHeight = $("#view").height();
    if (viewWidth < viewHeight) {
        ctx.canvas.width = viewHeight - viewHeight / 100;
        ctx.canvas.height = viewHeight - viewHeight / 100;
    }else {
        ctx.canvas.width = viewWidth - viewWidth / 100;
        ctx.canvas.height = viewWidth - viewWidth / 100;
    }

    //load and edit sprites
    let completeOne = false;
    let completeTwo = false;
    let isComplete = function(){
        if (completeOne && completeTwo){
            console.log("Runs");
            setTimeout(function(){
                makeMaze();
            }, 500);
        }
    }

    sprite = new Image();
    sprite.src = "../resources/maze_ghost.png" + "?" + new Date().getTime();
    sprite.setAttribute("crossOrigin", " ");
    sprite.onload = function(){
        sprite = changeBrightness(1.2, sprite);
        completeOne = true;
        console.log(completeOne);
        isComplete();
    }

    finishSprite = new Image();
    finishSprite.src = "../resources/maze_exit.png" + "?" + new Date().getTime();
    finishSprite.setAttribute("crossOrigin", " ");
    finishSprite.onload = function(){
        finishSprite = changeBrightness(1.1, finishSprite);
        completeTwo = true;
        console.log(completeTwo);
        isComplete();
    }
}

window.onresize = function(){
    let viewWidth = $("#view").width();
    let viewHeight = $("#view").height();
    if (viewWidth < viewHeight) {
        ctx.canvas.width = viewHeight - viewHeight / 100;
        ctx.canvas.height = viewHeight - viewHeight / 100;
    }else {
        ctx.canvas.width = viewWidth - viewWidth / 100;
        ctx.canvas.height = viewWidth - viewWidth / 100;
    }
    cellSize = ctx.canvas.width / difficulty;
    if(player != null){
        draw.redrawMaze(cellSize);
        player.redrawPlayer(cellSize);
    }
}

function makeMaze(){
    if (player != undefined){
        player.unbindKeyDown();
        player = null;
    }
    let e = document.getElementById("difficulty");
    difficulty = e.options[e.selectedIndex].value;
    cellSize = ctx.canvas.width / difficulty;
    maze = new Maze(difficulty, difficulty);
    draw = new drawMaze(maze, ctx, cellSize, finishSprite);
    player = new Player(maze, mazeCanvas, cellSize, displayVictoryMessage, sprite);
    if (document.getElementById("mazeContainer").style.opacity < "100"){
        document.getElementById("mazeContainer").style.opacity = "100";
    }
}

document.getElementById("startBtn").addEventListener("click", makeMaze);