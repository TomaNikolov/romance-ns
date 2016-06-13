wifi.sta.config("BW Esplanade" , "expo2015")  
wifi.sta.connect()
tmr.delay(3000000) --3 second
print(wifi.sta.status())
print(wifi.sta.getip())
