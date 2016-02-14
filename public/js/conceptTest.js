var mX;
var mY;
var distance;
var distanceText = $('#distance span');
var squareElement  = $('#element');
var MAX_INTENSE = 255;
var HITBOX_SIZE = 5;
var positivePins = [11,10,9,6,5,3];
var negativePins = [16,15,14,12,8,2];
var negativeInit = ["LOW","LOW","LOW","LOW","LOW","LOW"];
var valuesONDigital = ["HIGH","HIGH","HIGH","HIGH","HIGH","HIGH"];
var socket = io("http://localhost:3000");
var hapticGlove = new HapticGlove(socket,"glove");

hapticGlove.openPort("COM3",38400);

setTimeout(function(){

	hapticGlove.initializeMotor(positivePins);
	hapticGlove.initializeMotor(negativePins);
	hapticGlove.activateMotor(negativePins,negativeInit);
	
}, 2000);


function HitBox(x,y,width,height){
	this.X = x;
	this.Y = y;
	this.width = width;
	this.height = height;
}

var offset = squareElement.offset();
var squareHitBox = new HitBox(offset.left,offset.top, squareElement.width(), squareElement.height());

function calculateDistance(elem, mouseX, mouseY) {
    return Math.floor(Math.sqrt(Math.pow(mouseX - (elem.offset().left+(elem.width()/2)), 2) 
    	+ Math.pow(mouseY - (elem.offset().top+(elem.height()/2)), 2)));
}

function areIntersected(A,B){

	if ((A.X + A.width < B.X) || (B.X + B.width < A.X) || (A.Y + A.height < B.Y) ||
	 (B.Y + B.height < A.Y)){
		return false;
	}
	return true;
}

			
$(document).mousemove(function(e) {  

    mX = e.pageX;
    mY = e.pageY;
    distance = calculateDistance(squareElement, mX, mY);

    var middleTopCursor = mY + HITBOX_SIZE/2; 
    var middleLeftCursor = mX - HITBOX_SIZE/2; 
    var hitBoxes = [];
    var results = [];

    hitBoxes.push(new HitBox(middleLeftCursor - 10,middleTopCursor,HITBOX_SIZE,HITBOX_SIZE));
	hitBoxes.push(new HitBox(middleLeftCursor - 5,middleTopCursor,HITBOX_SIZE,HITBOX_SIZE));
	hitBoxes.push(new HitBox(middleLeftCursor, middleTopCursor,HITBOX_SIZE,HITBOX_SIZE));
	hitBoxes.push(new HitBox(middleLeftCursor + 5,middleTopCursor,HITBOX_SIZE,HITBOX_SIZE));
	hitBoxes.push(new HitBox(middleLeftCursor + 10,middleTopCursor,HITBOX_SIZE,HITBOX_SIZE));

	var intensity = 255 - distance;
	if (intensity < 0){
		intensity =0
	}

	results.push(intensity);

	for(i = 0; i < hitBoxes.length; i++){

		var intersect = areIntersected(squareHitBox,hitBoxes[i]);

		if(intersect){

			results.push(intensity);
		}

		else{
			results.push("0");
		}
		
	}

    console.log(results.join(" "));
    hapticGlove.activateMotor(positivePins,results);
    //socket.emit('activationData',results);
    

});

socket.on('connect', function () {

    console.log("Connected to socketIO");
});
