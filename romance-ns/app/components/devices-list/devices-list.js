var platform = require("platform");
var vmModule = require("../../shared/view-model/main-view-model");
var navigation = require("../../shared/navigation");
var twoPaneLayout = Math.min(platform.screen.mainScreen.widthDIPs, platform.screen.mainScreen.heightDIPs) > 600;
var page;
// Event handler for Page "loaded" event attached in main-page.xml
function pageLoaded(args) {
    page = args.object;
    page.bindingContext = vmModule.mainViewModel;
}
exports.pageLoaded = pageLoaded;
function listViewItemTap(args) {
    // Navigate to the details page with context set to the current data item
    if (!twoPaneLayout) {
        navigation.goToDeviceDetails();
    }
    vmModule.mainViewModel.set("selectedItem", args.view.bindingContext);
}
exports.listViewItemTap = listViewItemTap;
//# sourceMappingURL=devices-list.js.map