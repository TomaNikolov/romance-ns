function connectToWiFi(app_name, app_pass, sucessFunction, errorFunction, static_IP)
    wifiMaxConnectTime= 30; -- sec
    counter = wifiMaxConnectTime*2;

    print("Setting up WIFI...")
    wifi.setmode(wifi.STATION)
    wifi.sta.config(app_name, app_pass)
    if (static_IP) then
      wifi.sta.setip(static_IP);
    end
    wifi.sta.connect()
    print("Waiting for IP ")

    function tryConnect() 
        if wifi.sta.status() < 5 then
            print(counter)
            counter = counter - 1
            if counter < 1 then
                tmr.stop(1)
                print("Failed to connect in "..wifiMaxConnectTime.." sec.")
                errorFunction("timed out after "..wifiMaxConnectTime.." sec.")
        end
        else
            tmr.stop(1)
            print("Got IP: "..wifi.sta.getip().."["..(wifiMaxConnectTime*10-counter).." ticks]")
            sucessFunction()
        end
    end
    tmr.alarm(1, 500, 1, tryConnect)
end
