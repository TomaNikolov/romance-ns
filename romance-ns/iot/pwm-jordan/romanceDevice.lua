require("httpServer")
pwm = require("pwm")

A1_PIN = 1;
D1_PIN = 2;
DHT_PIN = 6;
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

function readSensor()
    local status, temp, humi, temp_dec, humi_dec = dht.read(DHT_PIN)

    if status == dht.OK then
        --print("DHT Temperature:"..temp.."; ".." Humidity:"..humi)
        return temp, humi
    elseif status == dht.ERROR_CHECKSUM then
        print( "DHT Checksum error." )
        return -1, -1
    elseif status == dht.ERROR_TIMEOUT then
        print( "DHT timed out." )
        return -1, -2
    end
end

function getDeviceInfo () 
    local X = readFile("deviceinfo.template.json");
	local temp, humi = readSensor()
    
	tmr.wdclr();
    X = X:gsub("{{A1}}", A1);
    X = X:gsub("{{D1}}", D1);
	X = X:gsub("{{T1}}", temp);
    X = X:gsub("{{H1}}", humi);
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
