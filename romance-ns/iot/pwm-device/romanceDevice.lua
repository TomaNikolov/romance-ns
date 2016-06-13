require("httpServer");
pwm = require("pwm");

A1_PIN = 1;
D1_PIN = 2;
UP_VALUE = 1023;
A1 = 0;
D1 = 0;
pwm.setup(1,1000,0);
pwm.start(1);
pwm.setup(2,1000,0);
pwm.start(2);

function readFile(filename)
	file.open(filename,'r')
	txt = ''
	repeat
		line = file.readline();
		if (line~=nil) then txt = txt .. line end
	until line == nil
	file.close();
	return(txt)
end

function getDeviceInfo () 
    local X = readFile("deviceinfo.template.json");
    tmr.wdclr();
    X = X:gsub("{{A1}}", A1);
    X = X:gsub("{{D1}}", D1);
    return X, "application/json"
end

function setValue(request)
	if (request.query["A1"]) then
                print(request.body)
                A1 = tonumber(request.query["A1"]);
                if A1~= nil and A1 >= 0 and A1 <1024 then
		    pwm.setduty(A1_PIN,A1);
                else
                    return "not romantic"
                end
	end
	if (request.query["D1"]) then
                D1 = tonumber(request.query["D1"]);
                if D1~= nil and D1 >= 0 and D1 <1024 then
		    if (D1 ~= 0) then
			    pwm.setduty(D1_PIN,UP_VALUE);
		    else
			    pwm.setduty(D1_PIN, 0);
		    end
                end
	end
	return "how romantic"
end

pages = {}
pages["/"] = function(request)
    return getDeviceInfo()
end
pages["/set"] = function(request)
    return setValue(request)
end

startWeb({pages=pages})