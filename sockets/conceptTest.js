module.exports = function(io){

	//var Glove = require('../gloveAPI/glove');
	//var glove = new Glove();
	var Glove = require('../gloveAPI/socketIOClient');
	var serialPort = require("serialport");
	var positivePins = [11,10,9,6,5,3];
	var negativePins = [16,15,14,12,8,2];
	var negativeInit = ["LOW","LOW","LOW","LOW","LOW"];
	var glove;

	io.sockets.on('connection', function(socket) {
		console.log("Socket Conectado");
		glove = new Glove(socket,"glove");

	});


	/*
		
		glove.on("open",function(){
		
		io.sockets.on('connection', function(socket) {

			glove.initializeMotor(positivePins);
			glove.initializeMotor(negativePins);
			glove.activateMotor(negativePins,negativeInit)
			console.log("Socket connected");

			socket.on('activationData', function(data){
				
				var values=[]
				for(i=0;i<data.length -1 ; i++){
					if(data[i]){
						values.push("HIGH");	
					}
					else{
						values.push("LOW");
					}
				}

				glove.activateMotor(positivePins,values);
			});
		});

		glove.on('data',function(data){

			console.log("llegaron datos");
			console.log(data);
		});

	});
	*/
	
}