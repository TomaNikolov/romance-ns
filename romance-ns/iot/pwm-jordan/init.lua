require("connect")

function sucessFunction()
    dofile("romanceDevice.lua")
end

function errorFunction()
    print("no wifi connection")
end

connectToWiFi(
    "BW Esplanade",
    "expo2015",
    sucessFunction,
    errorFunction,
    nil)
