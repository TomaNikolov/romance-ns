var observable = require("data/observable");
var observableArray = require("data/observable-array");
var device_item_1 = require("../models/device-item");
var master_item_1 = require("../models/master-item");
var requester = require("./../requester");
var Sqlite = require("nativescript-sqlite");
var _ = require("lodash");
var DevicesViewModel = (function (_super) {
    __extends(DevicesViewModel, _super);
    function DevicesViewModel() {
        _super.call(this);
        this._db = null;
        var that = this;
        that.getAndParseDevices();
    }
    DevicesViewModel.prototype.getAndParseDevices = function () {
        var that = this;
        return that.getStoredDevicesDetails()
            .then(function (storedDevices) {
            var items = new observableArray.ObservableArray();
            for (var _i = 0; _i < storedDevices.length; _i++) {
                var deviceDetails = storedDevices[_i];
                items.push(new master_item_1.MasterItem(deviceDetails.guid, deviceDetails.displayName, deviceDetails.ipAddress, that.getChildren(deviceDetails)));
            }
            that.set("items", items);
        })
            .catch(function (e) {
            that.set("items", []);
        });
    };
    DevicesViewModel.prototype.getChildren = function (deviceDetails) {
        var children = new observableArray.ObservableArray();
        _.forEach(deviceDetails.items, function (child) {
            children.push(new device_item_1.DeviceItem(child));
        });
        return children;
    };
    DevicesViewModel.prototype.addDevice = function (newDeviceInfo) {
        var that = this;
        return that.getDevicesDB()
            .then(function (db) {
            return that.getDeviceDetails(newDeviceInfo)
                .then(function (deviceDetails) {
                var items = that.get("items");
                items.push(new master_item_1.MasterItem(deviceDetails.guid, deviceDetails.displayName, deviceDetails.ipAddress, that.getChildren(deviceDetails)));
                return db.execSQL("insert into StoredDevices values (?, ?)", [
                    newDeviceInfo.ipAddress,
                    newDeviceInfo.displayName
                ]);
            });
        });
    };
    DevicesViewModel.prototype.getDeviceDetails = function (newDeviceInfo) {
        return requester.get(newDeviceInfo.ipAddress)
            .then(function (response) {
            var deviceInfo = {
                guild: response.device,
                displayName: newDeviceInfo.displayName,
                ipAddress: newDeviceInfo.ipAddress,
                items: response.actions
            };
            return Promise.resolve(deviceInfo);
        });
    };
    DevicesViewModel.prototype.getStoredDevicesDetails = function () {
        var that = this;
        return that.getDevicesDB()
            .then(function (db) {
            return db.all("select * from StoredDevices");
        })
            .then(function (dbDevices) {
            var promises = [];
            _.forEach(dbDevices, function (dbDevice) {
                promises.push(that.getDeviceDetails(dbDevice));
            });
            return Promise.all(promises);
        });
    };
    DevicesViewModel.prototype.getDevicesDB = function () {
        var that = this;
        if (that._db) {
            return Promise.resolve(that._db);
        }
        return new Sqlite("storedDevices.sqlite")
            .then(function (db) {
            db.resultType(Sqlite.RESULTSASOBJECT);
            return db.execSQL('create table if not exists StoredDevices (`ipAddress` text, `displayName` text)')
                .then(function () {
                that._db = db;
                return that._db;
            });
        });
    };
    return DevicesViewModel;
})(observable.Observable);
exports.mainViewModel = new DevicesViewModel();
//# sourceMappingURL=main-view-model.js.map