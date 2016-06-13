var observable = require("data/observable");
var observableArray = require("data/observable-array");
var device_item_1 = require("../models/device-item");
var items = new observableArray.ObservableArray();
items.push(new device_item_1.DeviceItem({
    "type": "actor",
    "info": "Light dimmer",
    "mode": "range",
    "kind": "light",
    "min": 0,
    "max": 1023,
    "queryParam": "A1",
    "currentValue": "123"
}));
exports.mainViewModel = new observable.Observable();
exports.mainViewModel.set("items", items);
//# sourceMappingURL=main-view-model.js.map