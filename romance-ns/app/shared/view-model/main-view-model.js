var observable = require("data/observable");
var observableArray = require("data/observable-array");
var device_item_1 = require("../models/device-item");
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
        return that.getStoredDevices()
            .then(function (storedDevices) {
            var items = new observableArray.ObservableArray();
            for (var _i = 0; _i < storedDevices.length; _i++) {
                var device = storedDevices[_i];
                items.push(device);
            }
            that.set("items", items);
        })
            .catch(function (e) {
            that.set("items", []);
        });
    };
    DevicesViewModel.prototype.addDevice = function (newDeviceInfo) {
        var that = this;
        return that.getDevicesDB()
            .then(function (db) {
            return that.getDeviceDetails(newDeviceInfo)
                .then(function (deviceDetails) {
                var items = that.get("items");
                items.push(new device_item_1.DeviceItem(deviceDetails));
                return db.execSQL("insert into StoredDevices values (?, ?, ?, ?, ?, ?, ?, ?)", [
                    deviceDetails.type,
                    deviceDetails.info,
                    deviceDetails.mode,
                    deviceDetails.kind,
                    deviceDetails.min,
                    deviceDetails.max,
                    deviceDetails.queryParam,
                    deviceDetails.currentValue
                ]);
            });
        });
    };
    DevicesViewModel.prototype.getDeviceDetails = function (newDeviceInfo) {
        return Promise.resolve({
            "type": "actor",
            "info": "Light dimmer",
            "mode": "range",
            "kind": "light",
            "min": 0,
            "max": 1023,
            "queryParam": "A1",
            "currentValue": "123"
        });
    };
    DevicesViewModel.prototype.getStoredDevices = function () {
        var that = this;
        return that.getDevicesDB()
            .then(function (db) {
            return db.all("select * from StoredDevices");
        })
            .then(function (dbDevices) {
            return _.map(dbDevices, function (dbDevice) {
                return new device_item_1.DeviceItem(dbDevice);
            });
            return dbDevices;
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
            return db.execSQL('create table if not exists StoredDevices (`type` text, `info` text, `mode` text, `kind` text, `min` numeric, `max` numeric, `queryParam` text, `currentValue` numeric)')
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