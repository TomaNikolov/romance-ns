var NewDeviceItem = (function () {
    function NewDeviceItem() {
        this._ipAddress = "";
        this._displayName = "";
    }
    Object.defineProperty(NewDeviceItem.prototype, "ipAddress", {
        get: function () {
            return this._ipAddress;
        },
        set: function (ipAddress) {
            this._ipAddress = ipAddress;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NewDeviceItem.prototype, "displayName", {
        get: function () {
            return this._displayName;
        },
        set: function (displayName) {
            this._displayName = displayName;
        },
        enumerable: true,
        configurable: true
    });
    return NewDeviceItem;
})();
exports.NewDeviceItem = NewDeviceItem;
//# sourceMappingURL=new-device.js.map