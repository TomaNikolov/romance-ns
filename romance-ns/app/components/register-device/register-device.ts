import pages = require("ui/page");
import textField = require("ui/text-field");
import observable = require("data/observable");
import vmModule = require("../../shared/view-model/main-view-model");
import {NewDeviceItem} from "../../shared/models/new-device";
import navigation = require("../../shared/navigation");

export function pageNavigatedTo(args: observable.EventData) {
    var page = < pages.Page > args.object;
    
    page.bindingContext = new NewDeviceItem();
}
    
export function onAddDevice(args: observable.EventData) {
    var page = < pages.Page > args.object;
    
    navigation.goToDevicesList();
    
    vmModule.mainViewModel.addDevice(page.bindingContext);
}