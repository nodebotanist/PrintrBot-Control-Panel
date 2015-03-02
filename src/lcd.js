var Lcd = require('lcd');
var Gpio = require('onoff').Gpio;

function PrintrBotLcd(){
	this.__lcd = null;
	this.__redPin = null;
	this.__greenPin = null;
	this.__bluePin = null;

	this.init = function(cols, rows, pins){
		this.__lcd = new Lcd({
			rs: pins.rs,//27,
			e: pins.e, //22,
			data: pins.data, //[25, 24, 23, 18],
			cols: cols, // 20,
			rows: rows //4
		});
		this.__redPin = pins.red || null; //4
		this.__greenPin = pins.green || null; //17
		this.__bluePin = pins.blue || null; //7

		if(this.__redPin){
			this.__redPin = new Gpio(this.__redPin, 'out');
		}
		if(this.__greenPin){
			this.__greenPin = new Gpio(this.__greenPin, 'out');
		}
		if(this.__bluePin){
			this.__bluePin = new Gpio(this.__bluePin, 'out');
		}		
	};

	this.setCursor= function(col, row){
		this.__lcd.setCursor(col, row);
	}

	this.print = function(message){
		this.__lcd.print(message);
	}
}

module.exports = PrintrBotLcd;