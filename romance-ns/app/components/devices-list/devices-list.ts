import observable = require("data/observable");
import pages = require("ui/page");
import frames = require("ui/frame");
import platform = require("platform");
import listView = require("ui/list-view");
import vmModule = require("../../shared/view-model/main-view-model");
import navigation = require("../../shared/navigation");

export function pageLoaded(args: observable.EventData) {
    page = < pages.Page > args.object;
    page.bindingContext = vmModule.mainViewModel;
}

export function listViewItemTap(args: listView.ItemEventData) {
    navigation.goToDeviceDetails();
    vmModule.mainViewModel.set("selectedItem", args.view.bindingContext);
}