var screen = {};
screen.id = document.getElementById("screen");
screen.context = screen.id.getContext("2d");
screen.width;
screen.height;
screen.adjust = function(){
  screen.id.width = window.innerWidth; 
  screen.id.height = window.innerHeight;
  screen.width = screen.id.width;
  screen.height = screen.id.height;
  card.setHeight();
};
screen.erase = function(){
  screen.context.clearRect(0, 0, screen.width, screen.height);
};
screen.draw = function(){
  help.draw();
  orbs.draw();
};

var help = {};
help.draw = function(){

};

var card = {};
card.id = document.getElementById("card");
card.setHeight = function(){
	var innerDiv = card.id.getElementsByTagName("div")[0];
	innerDiv.style.height = screen.height - 120 + "px";
};

function Orb(){
	this.x = Math.floor(Math.random() * screen.width);
	this.y = Math.floor(Math.random() * screen.height);
	var speedMin = 1;
	var speedMax = 2;
	this.speedX = speed(Math.random() * speedMax + speedMin);
	if(Math.random() < 0.5){
		this.speedX = -this.speedX;
	}
	this.speedY = speed(Math.random() * speedMax + speedMin);
	if(Math.random() < 0.5){
		this.speedY = -this.speedY;
	}
	this.radius = 75;
	this.opacity = 0;
	this.opacityMax = Math.random();
	this.spawn = Date.now();
	this.duration = Math.floor(Math.random() * 5000 + 5000);
	this.on = true;
	this.reset = function(){
		this.x = Math.floor(Math.random() * screen.width);
		this.y = Math.floor(Math.random() * screen.height);
		this.speedX = speed(Math.random() * speedMax + speedMin);
		if(Math.random() < 0.5){
			this.speedX = -this.speedX;
		}
		this.speedY = speed(Math.random() * speedMax + speedMin);
		if(Math.random() < 0.5){
			this.speedY = -this.speedY;
		}
		this.opacity = 0;
		this.on = true;
		this.spawn = Date.now();
	};
}

var orbs = {};
orbs.all = [];
orbs.max = 30;
orbs.update = function(){
	for(var i = 0, l = orbs.all.length; i < l; i++){
		var orb = orbs.all[i];
		orb.x += orb.speedX;
		orb.y += orb.speedY;
		if(orb.x > screen.width + orb.radius || orb.x < 0 - orb.radius || orb.y < 0 - orb.radius || orb.y > screen.height + orb.radius || orb.on == false && orb.opacity <= 0){
			orb.reset();
		}
	}
};
orbs.draw = function(){
	
	for(var i = 0, l = orbs.all.length; i < l; i++){
		var orb = orbs.all[i];
		var blurAmount = 15;
		var gradient = screen.context.createRadialGradient(orb.x, orb.y, orb.radius - blurAmount, orb.x, orb.y, orb.radius);
		gradient.addColorStop(0,"rgba(255, 255, 255, " + orb.opacity + ")");
		gradient.addColorStop(1,"rgba(255, 255, 255, 0)");
		screen.context.beginPath();
		screen.context.arc(orb.x,orb.y,orb.radius,0,2*Math.PI);
		if(orb.opacity < orb.opacityMax && orb.on == true){
			orb.opacity += 0.005;
		}
		if(Date.now() - orb.spawn > orb.duration){
			orb.on = false;
			orb.opacity -= 0.005;
		}
		screen.context.fillStyle = gradient;
		screen.context.fill();
		screen.context.closePath();
	}
};

var time = {};
time.then = Date.now();
time.now;
time.passed = 0.016;
time.update = function(){
	time.now = Date.now();
	time.passed = (time.now - time.then) / 1000; //Seconds since last frame
	time.then = time.now;
};

var speed = function(pixPerSecond){
	return pixPerSecond * time.passed;
};

var load = function(){
	screen.adjust();
	for(var i = 0; i < orbs.max; i++){
		orbs.all.push(new Orb());
	}
};

var loop = function(){
	time.update();
	orbs.update();
	screen.erase();
	screen.draw();
	window.requestAnimationFrame(loop);
};

window.onload = function(){
  
}
window.onresize = screen.adjust;

load();

loop();
