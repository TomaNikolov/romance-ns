"use strict";
var frames = require("ui/frame");
var platform = require("platform");
var vmModule = require("./main-view-model");
var twoPaneLayout = Math.min(platform.screen.mainScreen.widthDIPs, platform.screen.mainScreen.heightDIPs) > 600;
// Event handler for Page "loaded" event attached in main-page.xml
function pageLoaded(args) {
    var page = args.object;
    page.bindingContext = vmModule.mainViewModel;
}
exports.pageLoaded = pageLoaded;
function listViewItemTap(args) {
    // Navigate to the details page with context set to the current data item
    if (!twoPaneLayout) {
        frames.topmost().navigate("details-page");
    }
    vmModule.mainViewModel.set("selectedItem", args.view.bindingContext);
}
exports.listViewItemTap = listViewItemTap;
//# sourceMappingURL=main-page.js.map