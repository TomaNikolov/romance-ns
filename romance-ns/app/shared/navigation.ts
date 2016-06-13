import frameModule = require("ui/frame");

export function goToDevicesList() {
    frameModule.topmost().navigate("components/devices-list/devices-list");
}

export function goToDeviceDetails() {
    frameModule.topmost().navigate("components/device-details/device-details");
}

export function goToRegisterDevice() {
    frameModule.topmost().navigate("components/register-device/register-device");
}