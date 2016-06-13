require("connect")

function sucessFunction()
    dofile("romanceDevice.lua")
end

function errorFunction()
    print("no wifi connection")
end

connectToWiFi(
    "iHome",
    "7878787878787878",
    sucessFunction,
    errorFunction,
    nil)
