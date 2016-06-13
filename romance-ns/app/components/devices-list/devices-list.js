var vmModule = require("../../shared/view-model/main-view-model");
var navigation = require("../../shared/navigation");
function pageLoaded(args) {
    var page = args.object;
    page.bindingContext = vmModule.mainViewModel;
}
exports.pageLoaded = pageLoaded;
function listViewItemTap(args) {
    navigation.goToDeviceDetails();
    vmModule.mainViewModel.set("selectedItem", args.view.bindingContext);
}
exports.listViewItemTap = listViewItemTap;
function onRegisterTap() {
    navigation.goToRegisterDevice();
}
exports.onRegisterTap = onRegisterTap;
//# sourceMappingURL=devices-list.js.map