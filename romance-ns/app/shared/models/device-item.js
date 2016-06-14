var action_type_1 = require("../enums/action-type");
var action_mode_1 = require("../enums/action-mode");
var observable = require("data/observable");
var requester = require("./../requester");
var DeviceItem = (function (_super) {
    __extends(DeviceItem, _super);
    function DeviceItem(fromObject) {
        _super.call(this);
        this._type = action_type_1.ActionType.actor;
        this._info = "";
        this._mode = action_mode_1.ActionMode.toggle;
        this._kind = "";
        this._queryParam = "";
        this._currentValue = 0;
        this._minValue = Number.NaN;
        this._maxValue = Number.NaN;
        this._ipAddress = "";
        var that = this;
        for (var propertyName in fromObject) {
            this[propertyName] = fromObject[propertyName];
        }
        that.addEventListener(observable.Observable.propertyChangeEvent, that.changeState.bind(that));
    }
    Object.defineProperty(DeviceItem.prototype, "type", {
        get: function () {
            return this._type;
        },
        set: function (type) {
            this._type = type;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DeviceItem.prototype, "info", {
        get: function () {
            return this._info;
        },
        set: function (info) {
            this._info = info;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DeviceItem.prototype, "mode", {
        get: function () {
            return this._mode;
        },
        set: function (mode) {
            this._mode = mode;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DeviceItem.prototype, "kind", {
        get: function () {
            return this._kind;
        },
        set: function (kind) {
            this._kind = kind;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DeviceItem.prototype, "queryParam", {
        get: function () {
            return this._queryParam;
        },
        set: function (queryParam) {
            this._queryParam = queryParam;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DeviceItem.prototype, "currentValue", {
        get: function () {
            return this._currentValue;
        },
        set: function (currentValue) {
            this._currentValue = currentValue;
            this.set("currentBoolValue", !!currentValue);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DeviceItem.prototype, "currentBoolValue", {
        get: function () {
            return this._currentBoolValue;
        },
        set: function (currentBoolValue) {
            this._currentBoolValue = currentBoolValue;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DeviceItem.prototype, "minValue", {
        get: function () {
            return this._minValue;
        },
        set: function (minValue) {
            this._minValue = minValue;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DeviceItem.prototype, "maxValue", {
        get: function () {
            return this._maxValue;
        },
        set: function (maxValue) {
            this._maxValue = maxValue;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DeviceItem.prototype, "actionIcon", {
        get: function () {
            switch (this.mode) {
                case "range":
                    return "\uf10d";
                case "toggle":
                    return "\uf13e";
                case "temp":
                    return "\uf127";
                case "humidity":
                    return "\uf15e";
                case "pump":
                    return "\uf10f";
                default:
                    return "\uf14f";
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DeviceItem.prototype, "ipAddress", {
        get: function () {
            return this._ipAddress;
        },
        set: function (ipAddress) {
            this._ipAddress = ipAddress;
        },
        enumerable: true,
        configurable: true
    });
    DeviceItem.prototype.changeState = function (pcd) {
        var that = this;
        if (pcd.propertyName == "currentValue" || pcd.propertyName == "currentBoolValue") {
            var value = pcd.value;
            if (pcd.propertyName == "currentBoolValue") {
                value = value ? 1 : 0;
            }
            requester.get(that.ipAddress + "/set?" + that.queryParam + "=" + value.toString())
                .then(function (response) {
            });
        }
    };
    return DeviceItem;
})(observable.Observable);
exports.DeviceItem = DeviceItem;
//# sourceMappingURL=device-item.js.map