
pwm= require("pwm");

print(wifi.sta.getip()) -- Dynamic IP Address
led1 = 1
evenCounter = 0;
currentLightValue = 0
pwm.setup(1,1000,0);
pwm.start(1);

srv=net.createServer(net.TCP)
srv:listen(80,function(conn)
    conn:on("receive", function(client,request)
        local buf = "";
        local _, _, method, path, vars = string.find(request, "([A-Z]+) (.+)?(.+) HTTP");
        if(method == nil)then
            _, _, method, path = string.find(request, "([A-Z]+) (.+) HTTP");
        end
        local _GET = {}
        if (vars ~= nil)then
            for k, v in string.gmatch(vars, "(%w+)=(%w+)&*") do
                _GET[k] = v
            end
        end
        local pesho = _GET.pin;
		if (evenCounter %2 == 0)then
			buf = buf.."<meta http-equiv='refresh' content='0'>";
		end
        buf = buf.."<h1>ESP8266 Web Server</h1>";
        buf = buf.."<form>"
        buf = buf.."<input type='range' name='pin' value="..currentLightValue.." min='10' max='1023' step='5'/>"
        buf = buf.."<input type='submit' value='Submit' onClick='javascript:history.go(0)'><br>"
        -- buf = buf.."<a href=\'?pin=1000\'><button>ON</button></a>"
        -- buf = buf.."<a href=\'?pin=0\'><button>OFF</button></a>"
        buf = buf.."</form>"
        if(_GET.pin)then
              gpio.write(1, gpio.HIGH);
              pwm.setduty(1,_GET.pin);
			  currentLightValue = _GET.pin;
			  evenCounter++;
        end
        client:send(buf);
        client:close();
        collectgarbage();
    end)
end)