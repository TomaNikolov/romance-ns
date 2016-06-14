var observable = require("data/observable");
var MasterItem = (function (_super) {
    __extends(MasterItem, _super);
    function MasterItem(guid, displayName, items) {
        _super.call(this);
        this.guid = guid;
        this.displayName = displayName;
        this.items = items;
    }
    return MasterItem;
})(observable.Observable);
exports.MasterItem = MasterItem;
//# sourceMappingURL=master-item.js.map