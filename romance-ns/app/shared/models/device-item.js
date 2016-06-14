var action_type_1 = require("../enums/action-type");
var action_mode_1 = require("../enums/action-mode");
var DeviceItem = (function () {
    function DeviceItem(fromObject) {
        this._type = action_type_1.ActionType.actor;
        this._info = "";
        this._mode = action_mode_1.ActionMode.toggle;
        this._kind = "";
        this._queryParam = "";
        this._value = 0;
        this._minValue = Number.NaN;
        this._maxValue = Number.NaN;
        for (var propertyName in fromObject) {
            this[propertyName] = fromObject[propertyName];
        }
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
    Object.defineProperty(DeviceItem.prototype, "value", {
        get: function () {
            return this._value;
        },
        set: function (value) {
            this._value = value;
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
                default:
                    return "\uf14f";
            }
        },
        enumerable: true,
        configurable: true
    });
    return DeviceItem;
})();
exports.DeviceItem = DeviceItem;
//# sourceMappingURL=device-item.js.map