var HapticGlove = require('./glove');
var events = require("events");

function HapticGloveSocketIO(socket,id){

	this.id = id;
	this.socket = socket;
	this.glove = new HapticGlove();

	var self = this;

	this.socket.on('openPortClient',function(data){
		if(self.id === data.id){
			console.log("Enviado OpenPort");

			self.glove.openPort(data.portName,data.baudRate);

			self.glove.on('open',function(){

				self.emit('open','');
				self.glove.on('data', function(data){

					self.emit('data', data);
				});
			});
			
		}
	});

	this.socket.on('closePortClient',function(data){
		if(self.id === data.id){

			
		}
	});

	this.socket.on('getPortNamesClient',function(data){
		if(self.id === data.id){

			
		}
	});

	this.socket.on('initializeMotorClient',function(data){
		if(self.id === data.id){

			self.glove.initializeMotor(data.pins);
		}
	});


	this.socket.on('writeClient',function(data){
		if(self.id === data.id){

			
		}
	});

	this.socket.on('activateMotorClient',function(data){
		if(self.id === data.id){

			self.glove.activateMotor(data.pins, data.values);
		}
	});

	this.socket.on('analogReadClient',function(data){
		if(self.id === data.id){

			
		}
	});

	this.socket.on('digitalReadClient',function(data){
		if(self.id === data.id){

			
		}
	});

	this.socket.on('pinModeClient',function(data){
		if(self.id === data.id){

			
		}
	});

	this.socket.on('digitalWriteClient',function(data){
		if(self.id === data.id){

			
		}
	});

	this.socket.on('analogWriteClient',function(data){
		if(self.id === data.id){

			
		}
	});

	/*this.socket.on(,function(data){
		if(this.id === data.id){

			
		}
	});*/
	
}

HapticGloveSocketIO.prototype = new events.EventEmitter;

module.exports = HapticGloveSocketIO;
