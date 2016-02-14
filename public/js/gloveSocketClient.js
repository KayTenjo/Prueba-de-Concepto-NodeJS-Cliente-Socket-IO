function HapticGlove(socket,id){

	this.id = id;
	this.socket = socket;
	var self = this;

	this.openPort = function(portName, baudRate){
		self.socket.emit('openPortClient',
			{
				id: self.id,
				portName: portName,
				baudRate: baudRate
			}
		);
	}

	this.getPortNames = function(){
		self.socket.emit('getPortNamesClient',{id : self.id});
	}

	this.write = function(data){
		self.socket.emit('writeClient',
			{
				id: self.id, 
				data: data
			}
		);
	}

	this.closePort = function(){
		self.socket.emit('closePortClient',{id : self.id});
	}

	this.initializeMotor = function(pins) {
    	self.socket.emit('initializeMotorClient',
			{
				id: self.id, 
				pins: pins
			}
		);
  	}

  	this.activateMotor = function(pins,values) {
  		self.socket.emit('activateMotorClient',
			{
				id: self.id, 
				pins: pins,
				values: values
			}
		);
  	}

	this.analogRead = function(pin) {
		self.socket.emit('analogReadClient',
			{
				id: self.id, 
				pins: pins
			}
		);
	}

  	this.digitalRead = function(pin) {
    	self.socket.emit('digitalReadClient',
			{
				id: self.id, 
				pin: pin
			}
		);
    }

  	this.pinMode = function(pins, modes) {
    	self.socket.emit('pinModeClient',
			{
				id: self.id, 
				pins: pins,
				modes: modes
			}
		);
  	}

  	this.digitalWrite = function(pins, values) {
  		self.socket.emit('digitalWriteClient',
			{
				id: self.id, 
				pins: pins,
				values: values
			}
		);
	}
   
  	this.analogWrite = function(pins,values) {
  		self.socket.emit('analogWriteClient',
			{
				id: self.id, 
				pins: pins,
				values: values
			}
		);
	}
}