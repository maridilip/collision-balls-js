// Initial Setup

var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;


// Variables
var mouse = {
	x: innerWidth / 2,
	y: innerHeight / 2 
};

var colors = [
	'#2185C5',
	'#7ECEFD',
	'#FFF6E5',
	'#FF7F66'
];

//var mouse={x:0,y:0};
// Event Listeners
addEventListener("mousemove", function(event) {
	
	mouse.x = event.clientX;
	mouse.y = event.clientY;
	//console.log(mouse.y);
});

addEventListener("resize", function() {
	canvas.width = innerWidth;	
	canvas.height = innerHeight;

	init();
});


// Utility Functions
function randomIntFromRange(min,max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomColor(colors) {
	return colors[Math.floor(Math.random() * colors.length)];
}


// Objects
function Ball(x, y, radius, color) {
	this.x = x;
	this.y = y;
	this.radius = radius;
	this.color = color;
	//this.vy=vy;
	this.acc=0.8;
	this.friction=0.1;
	this.vx=(Math.random()-0.5) * 3;
	this.vy=(Math.random()-0.5) * 3;
	this.update = function() {
		
		//this.y+=this.vy;
		if(this.x+this.radius>canvas.width || this.x-this.radius<0){
			this.vx=-this.vx;
		}
		if(this.y+this.radius>canvas.height || this.y-this.radius<0){
			this.vy=-this.vy;
		}
		if(mouse.x-this.x<30 && mouse.x-this.x>-30 && mouse.y-this.y<30 && mouse.y-this.y>-30){
			this.radius+=1;
		}
		else if(this.radius>5){
			this.radius-=0.7;
		}
		
		/*
		if(this.y+this.radius>canvas.height){
			this.vy=-this.vy*this.friction;
		}
		else{
			this.vy+=this.acc;
		}
		
		*/
		
		
		this.y+=this.vy;
		this.x+=this.vx;
		this.draw();
	};

	this.draw = function() {
		c.beginPath();
		c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);	
		c.fillStyle = this.color;
		c.fill();
		c.closePath();
	};
}


// Implementation
function init() {

}
//var ball=new Ball(Math.random()*((canvas.width-30*2)+30),Math.random()*((canvas.height-30*2)+30),30,'red');
var balls=[];
for(var i=0;i<1000;i++){
	balls.push(new Ball(Math.random()*((canvas.width-30*2)+30),Math.random()*((canvas.height-30*2)+30),Math.random()*6+10,randomColor(colors)));
	//balls.push(new Ball(mouse.x,mouse.y,30,'red'));
	//console.log(balls)
	
}
// Animation Loop
function animate() {
	requestAnimationFrame(animate);

	c.clearRect(0, 0, canvas.width, canvas.height);
	for(var i=0;i<balls.length;i++){
	balls[i].update();
	}
}

init();
animate();