import pages = require("ui/page");
import observable = require("data/observable");
import vmModule = require("../../shared/view-model/main-view-model");

export function pageNavigatedTo(args: observable.EventData) {
    var page = < pages.Page > args.object;
    page.bindingContext = vmModule.mainViewModel.get("selectedItem");
}

export function onRefreshTap(args: observable.EventData) {
    
}