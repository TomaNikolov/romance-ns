var vmModule = require("../../shared/view-model/main-view-model");
var new_device_1 = require("../../shared/models/new-device");
var navigation = require("../../shared/navigation");
function pageNavigatedTo(args) {
    var page = args.object;
    page.bindingContext = new new_device_1.NewDeviceItem();
}
exports.pageNavigatedTo = pageNavigatedTo;
function onAddDevice(args) {
    var page = args.object;
    navigation.goToDevicesList();
    vmModule.mainViewModel.addDevice(page.bindingContext);
}
exports.onAddDevice = onAddDevice;
//# sourceMappingURL=register-device.js.map