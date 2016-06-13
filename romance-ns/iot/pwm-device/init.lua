wifi.sta.config("BW Esplanade","expo2015")
wifi.sta.connect()
while wifi.sta.status() >= 5 do
  tmr.delay(1000000)
end
print(wifi.sta.status())
print(wifi.sta.getip())
dofile("romanceDevice.lua")