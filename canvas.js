var canvas = document.querySelector("canvas");

canvas.width = 3 * window.innerWidth/4;
canvas.height = 3 * window.innerHeight/4;

var c = canvas.getContext("2d");

//The real code starts from here

var gameover = false;
var gamefinished = false;

var obstacleloc = {
    list: [
        {
            x: -1000,
            y: -1000
        }
    ]
};

for(var k=1; k<=10; k++) {
    var tempx = canvas.width * Math.random() + canvas.width/5;
    var tempy = canvas.height * Math.random();

    obstacleloc.list.push({
        x: tempx,
        y: tempy
    });
}

var mouse = {
    x: undefined,
    y: undefined
}

createmaze();

window.addEventListener("mousemove", (event) => {
    mouse.x = event.x - canvas.offsetLeft;
    mouse.y = event.y - canvas.offsetTop;

    clearscreen();
    createmaze();
    var circle = new Circle(mouse.x, mouse.y, 12.5);
    if((gameover == false) && (gamefinished == false))  {
        circle.draw("chocolate", "chocolate");
    }

    if((belongsTo(mouse.y, 0, 12.5)) && (belongsTo(mouse.x, 0, canvas.width - 50 + 12.5)) || 
        ((belongsTo(mouse.y, canvas.height/5 - 12.5, canvas.height/5 + 12.5)) && (belongsTo(mouse.x, 50, canvas.width))) || 
        ((belongsTo(mouse.y, 2*canvas.height/5 - 12.5, 2*canvas.height/5 + 12.5)) && (belongsTo(mouse.x, 0, canvas.width - 50))) || 
        ((belongsTo(mouse.y, 3*canvas.height/5 - 12.5, 3*canvas.height/5 + 12.5)) && (belongsTo(mouse.x, 50, canvas.width))) || 
        ((belongsTo(mouse.y, 4*canvas.height/5 - 12.5, 4*canvas.height/5 + 12.5)) && (belongsTo(mouse.x, 0, canvas.width - 50)))) {
            c.strokeStyle = "red";
            c.fillStyle = "red";
            c.strokeText("Game Over", canvas.width/2 - 100, canvas.height/2 - 25, 400);
            c.fillText("Game Over", canvas.width/2 - 100, canvas.height/2 - 25, 400);
            gameover = true;
    }

    if((belongsTo(mouse.x, canvas.height/15, 2*canvas.height/15)) && (belongsTo(mouse.y, 4*canvas.height/5 + canvas.height/15, 4*canvas.height/5 + 2*canvas.height/15))) {
        c.strokeStyle = "green";
        c.fillStyle = "green";
        c.strokeText("Winner!", canvas.width/2 - 100, canvas.height/2 - 25, 400);
        c.fillText("Winner!", canvas.width/2 - 100, canvas.height/2 - 25, 400);
        gamefinished = true;
    }

    for(var m=0; m<=10; m++) {
        if(distance(mouse.x, mouse.y, obstacleloc.list[m].x, obstacleloc.list[m].y) <= canvas.height/20) {
            c.strokeStyle = "red";
            c.fillStyle = "red";
            c.strokeText("Game Over", canvas.width/2 - 100, canvas.height/2 - 25, 400);
            c.fillText("Game Over", canvas.width/2 - 100, canvas.height/2 - 25, 400);
            gameover = true;
        }
    }
});

function Circle(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;

    this.draw = (outline, fill) => {
        c.beginPath();
        c.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
        c.strokeStyle = outline;
        c.stroke();
        c.fillStyle = fill;
        c.fill();
    }
}

function createmaze() {
    var width = canvas.height/5;
    for(var i=1; i<=4; i++) {
        if(i%2 == 0) {
            c.beginPath();
            c.moveTo(0, i*width);
            c.lineTo(canvas.width - 50, i*width);
            c.strokeStyle = "red";
            c.stroke();
        }
        else {
            c.beginPath();
            c.moveTo(canvas.width, i*width);
            c.lineTo(50, i*width);
            c.strokeStyle = "red";
            c.stroke();
        }
    }
    //c.strokeRect(0, 0, canvas.width, canvas.height);
    c.beginPath();
    c.moveTo(0, 0);
    c.lineTo(canvas.width - 50, 0);

    c.strokeStyle = "black";
    c.stroke();

    c.beginPath();
    c.moveTo(canvas.width, 0);
    c.lineTo(canvas.width, canvas.height);

    c.strokeStyle = "black";
    c.stroke();

    c.beginPath();
    c.moveTo(canvas.width, canvas.height);
    c.lineTo(0, canvas.height);

    c.strokeStyle = "black";
    c.stroke();

    c.beginPath();
    c.moveTo(0, 0);
    c.lineTo(0, canvas.width);

    c.strokeStyle = "black";
    c.stroke();

    c.strokeStyle = "green";
    c.strokeRect(canvas.height/15, 4*canvas.height/5 + canvas.height/15, canvas.height/15, canvas.height/15);
    c.fillStyle = "green";
    c.fillRect(canvas.height/15, 4*canvas.height/5 + canvas.height/15, canvas.height/15, canvas.height/15);

    for(var k=0; k<10; k++) {
        var circx = obstacleloc.list[k].x;
        var circy = obstacleloc.list[k].y;
        var circ = new Circle(circx, circy, canvas.height/20);
        circ.draw("black", "black");
    }
    
    
    

    if(gameover == true) {
        c.strokeStyle = "red";
        c.fillStyle = "red";
        c.strokeText("Game Over", canvas.width/2 - 100, canvas.height/2 - 25, 400);
        c.fillText("Game Over", canvas.width/2 - 100, canvas.height/2 - 25, 400);
    }

    if(gamefinished == true) {
        c.strokeStyle = "green";
        c.fillStyle = "green";
        c.strokeText("Winner!", canvas.width/2 - 100, canvas.height/2 - 25, 400);
        c.fillText("Winner!", canvas.width/2 - 100, canvas.height/2 - 25, 400);
    }
}

function clearscreen() {
    c.clearRect(0, 0, canvas.width, canvas.height);
}

function belongsTo(number, start, end) {
    if((number > start) && (number < end)) {
        return true;
    }
    else {
        return false;
    }
}

function distance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}
