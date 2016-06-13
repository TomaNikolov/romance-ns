var observable = require("data/observable");
var observableArray = require("data/observable-array");
var device_item_1 = require("../models/device-item");
var requester = require("./../requester");
var items = new observableArray.ObservableArray();
requester.get('')
    .then(function (response) {
    var actions = response.actions;
    actions.forEach(function (action) {
        items.push(new device_item_1.DeviceItem(action));
    });
});
exports.mainViewModel = new observable.Observable();
exports.mainViewModel.set("items", items);
//# sourceMappingURL=main-view-model.js.map