server = require("httpServer");
pwm = require("pwm");

A1_PIN = 1
D1_PIN = 2
UP_VALUE = 1023
A1 = 0
D1 = 0

function getDeviceInfo () 
    file.open("deviceInfo.template.json")
     X = file.read()
     file.close()
     tmr.wdclr()
     X:gsub("{{A1}}", A1)
     X:gsub("{{D1}}", D1)
     return response, "application/json"
end

function setValue(request)
	if (request.query["A1"]) then
		A1 = request.query["A1"]
		pwm.setduty(A1_PIN,A1)
	end
	if (request.query["D1"]) then
		D1 = request.query["D1"]
		if (D1 != 0) then
			pwm.setduty(D1_PIN,UP_VALUE)
		else
			pwm.setduty(D1_PIN, 0)
		end
	end
	return "how romantic"
end

pages = {}
pages["/"] = function(request)
    
    if (request.method == "GET") then
    	return getDeviceInfo()
    elseif (request.method == "POST") then
    	response = setValue(request)
	return response
    else
    	return "Invalid method"
    end
end

deviceServer = server.startServer(pages)