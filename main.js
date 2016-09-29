var screen = new Object();
screen.canvas = document.getElementById("canvas");
screen.context = screen.canvas.getContext("2d");
screen.width = window.innerWidth;
screen.height = window.innerHeight;
screen.adjust = function(){
		screen.width = window.innerWidth;
		screen.height = window.innerHeight;
		screen.canvas.width = screen.width;
		screen.canvas.height = screen.height;
};
screen.draw = function(){
		color.update();
		line.drawTrail();
		//line.drawLines();
		menu.draw();
};
screen.clear = function(){
		var ctx = screen.context;
		ctx.clearRect(0,0,screen.width,screen.height);
};

var line = new Object();
line.color = function(color){
	var ctx = screen.context;
	ctx.strokeStyle = color;
};
line.drawLines = function(){
	var ctx = screen.context;
	for(var i = 0; i < line.lineRects.length; i++){
		var l = line.lineRects[i];
		ctx.beginPath();
		ctx.moveTo(l.x1,l.y1);
		ctx.lineTo(l.x2,l.y2);
		ctx.lineTo(l.x3,l.y3);
		ctx.lineTo(l.x4,l.y4);
		ctx.lineTo(l.x1,l.y1)
		ctx.stroke();
		ctx.closePath();
	}
};
line.drawTrail = function(){
	var ctx = screen.context;
	for(var i = 0; i < line.trailLines.length; i++){
		if(i % line.trailSpace === 0){
			var l = line.trailLines[i];
			ctx.beginPath();
			ctx.moveTo(l.x1,l.y1);
			ctx.lineTo(l.x2,l.y2);
			ctx.lineTo(l.x3,l.y3);
			ctx.lineTo(l.x4,l.y4);
			ctx.lineTo(l.x1,l.y1)
			ctx.stroke();
			ctx.closePath();
		}
	}
};
line.draw = function(x1,y1,x2,y2){
	var ctx = screen.context;
	ctx.beginPath();
	ctx.moveTo(x1,y1);
	ctx.lineTo(x2,y2);
	ctx.stroke();
	ctx.closePath();
};
line.updateTrails = function(){
	for(var i = 0; i < line.lineRects.length; i++){
		var l = line.lineRects[i];
		line.trailLines.unshift(new line.trailLine(
			l.x1, 
			l.y1, 
			l.speedX1, 
			l.speedY1, 
			l.x2, 
			l.y2, 
			l.speedX2, 
			l.speedY2, 
			l.x3, 
			l.y3, 
			l.speedX3, 
			l.speedY3, 
			l.x4, 
			l.y4, 
			l.speedX4, 
			l.speedY4
		));
		while(line.trailLines.length > line.trailLength){
			line.trailLines.pop();
		}
	}
};
line.trailLine = function(x1,y1,speedX1,speedY1,x2,y2,speedX2,speedY2,x3,y3,speedX3,speedY3,x4,y4,speedX4,speedY4){
	this.x1 = x1;
	this.y1 = y1;
	this.speedX1 = speedX1;
	this.speedY1 = speedY1;
	this.x2 = x2;
	this.y2 = y2;
	this.speedX2 = speedX2;
	this.speedY2 = speedY2;
	this.x3 = x3;
	this.y3 = y3;
	this.speedX3 = speedX3;
	this.speedY3 = speedY3;
	this.x4 = x4;
	this.y4 = y4;
	this.speedX4 = speedX4;
	this.speedY4 = speedY4;
};
line.trailLines = [];
line.trailSpace = 5;
line.trailLength = line.trailSpace * 4;
line.speedMax = 2;
line.speedMin = 0.5;
line.LineRect = function(){
	this.x1 = Math.round(Math.random() * screen.width);
	this.y1 = Math.round(Math.random() * screen.height);
	this.speedX1 = Math.random() * line.speedMax + line.speedMin;
	this.speedY1 = Math.random() * line.speedMax + line.speedMin;
	this.x2 = Math.round(Math.random() * screen.width);
	this.y2 = Math.round(Math.random() * screen.height);
	this.speedX2 = Math.random() * line.speedMax + line.speedMin;
	this.speedY2 = Math.random() * line.speedMax + line.speedMin;
	this.x3 = Math.round(Math.random() * screen.width);
	this.y3 = Math.round(Math.random() * screen.height);
	this.speedX3 = Math.random() * line.speedMax + line.speedMin;
	this.speedY3 = Math.random() * line.speedMax + line.speedMin;
	this.x4 = Math.round(Math.random() * screen.width);
	this.y4 = Math.round(Math.random() * screen.height);
	this.speedX4 = Math.random() * line.speedMax + line.speedMin;
	this.speedY4 = Math.random() * line.speedMax + line.speedMin;
	
};
line.lineRects = [
	new line.LineRect()
];
line.update = function(){
	for(var i = 0; i < line.lineRects.length; i++){
		var l = line.lineRects[i];
		if(l.x1 > screen.width){
			l.speedX1 = -l.speedX1;
		}
		if(l.x1 < 0){
			l.speedX1 = -l.speedX1;
		}
		if(l.y1 > screen.height){
			l.speedY1 = -l.speedY1;
		}
		if(l.y1 < 0){
			l.speedY1 = -l.speedY1;
		}
		if(l.x2 > screen.width){
			l.speedX2 = -l.speedX2;
		}
		if(l.x2 < 0){
			l.speedX2 = -l.speedX2;
		}
		if(l.y2 > screen.height){
			l.speedY2 = -l.speedY2;
		}
		if(l.y2 < 0){
			l.speedY2 = -l.speedY2;
		}
		if(l.x3 > screen.width){
			l.speedX3 = -l.speedX3;
		}
		if(l.x3 < 0){
			l.speedX3 = -l.speedX3;
		}
		if(l.y3 > screen.height){
			l.speedY3 = -l.speedY3;
		}
		if(l.y3 < 0){
			l.speedY3 = -l.speedY3;
		}
		if(l.x4 > screen.width){
			l.speedX4 = -l.speedX4;
		}
		if(l.x4 < 0){
			l.speedX4 = -l.speedX4;
		}
		if(l.y4 > screen.height){
			l.speedY4 = -l.speedY4;
		}
		if(l.y4 < 0){
			l.speedY4 = -l.speedY4;
		}
		l.x1 += l.speedX1;
		l.y1 += l.speedY1;
		l.x2 += l.speedX2;
		l.y2 += l.speedY2;
		l.x3 += l.speedX3;
		l.y3 += l.speedY3;
		l.x4 += l.speedX4;
		l.y4 += l.speedY4;
	}
};

var color = new Object();
color.rgba = function(r,g,b){
	return "rgba(" + r + "," + g + "," + b + ",1)";
}
color.r = 255;
color.useR = false;
color.g = 0;
color.useG = true;
color.b = 0;
color.useB = false;
color.change = 1;
color.update = function(){
	var ctx = screen.context;
	if(color.r > 255){
		color.useR = false;
		color.useG = true;
	} 
	if(color.g > 255){
		color.useG = false;
		color.useB = true;
	} 
	if(color.b > 255){
		color.useB = false;
		color.useR = true;
	} 
	
	if(color.useR){
		color.b -= color.change;
		color.r += color.change;
	}
	if(color.useG){
		color.r -= color.change;
		color.g += color.change;
	}
	if(color.useB){
		color.g -= color.change;
		color.b += color.change;
	}
	ctx.strokeStyle = color.rgba(color.r,color.g,color.b);
};

var menu = new Object();
menu.draw = function(){
	var ctx = screen.context;
	ctx.textAlign = "right";
	ctx.fillStyle = color.rgba(255,255,255);
	ctx.fillText("Up: Add Rings",screen.width - 20,50);
	ctx.fillText("Down: Remove Rings",screen.width - 20,70);
};

var app = new Object();
app.update = function(){
	line.update();
	line.updateTrails();
};
app.loop = function(){
	screen.clear();
	app.update();
	screen.draw();
};
app.controls = function(evt){
	switch(evt.keyCode){
		case 38:
			line.trailLength += line.trailSpace;
			break;
		case 40:
			if(line.trailLength > 0){
				line.trailLength -= line.trailSpace;
			}
			break;
	}
};

//Listeners
window.onresize = screen.adjust;
window.onkeydown = app.controls;

screen.adjust();
screen.draw();

window.setInterval(app.loop, 1000 / 60);
