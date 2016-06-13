var frameModule = require("ui/frame");
function goToDevicesList() {
    frameModule.topmost().navigate("components/devices-list/devices-list");
}
exports.goToDevicesList = goToDevicesList;
function goToDeviceDetails() {
    frameModule.topmost().navigate("components/device-details/device-details");
}
exports.goToDeviceDetails = goToDeviceDetails;
function goToRegisterDevice() {
    frameModule.topmost().navigate("components/register-device/register-device");
}
exports.goToRegisterDevice = goToRegisterDevice;
//# sourceMappingURL=navigation.js.map