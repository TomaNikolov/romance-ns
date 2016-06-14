var NewDeviceItem = (function () {
    function NewDeviceItem() {
        this._ipAddress = "";
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
    return NewDeviceItem;
})();
exports.NewDeviceItem = NewDeviceItem;
//# sourceMappingURL=new-device.js.map