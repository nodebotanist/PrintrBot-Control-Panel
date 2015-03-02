var express = require('express');
var http = require('http');
var bl = require('bl');

var Lcd = require('./src/lcd');

var app = express();

var config = require('./config/keys');

var api_address = config.api_address;
var api_port = config.api_port;
var api_key = config.api_key;
var lcd_pins = config.lcd_pins;

var lcd = new Lcd();
lcd.init(20, 4, lcd_pins);

console.log(api_address);

function tempData(){
	http.get({
		hostname: api_address,
		port: api_port,
		path: 'api/printer/tool',
		headers: {
			'X-Api-Key': api_key
		}
	}, function(res){
		res.pipe(bl(function(err, data){
			var tempData = JSON.parse(data.toString());
			lcd.setCursor(0, 0);
			lcd.print("Extruder: " + tempData.temps.tool0.actual + " Deg C");
		}))
	})
}

tempData();

setInterval(tempData, 10000);


app.listen(1337);