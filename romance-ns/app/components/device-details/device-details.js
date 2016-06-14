var vmModule = require("../../shared/view-model/main-view-model");
function pageNavigatedTo(args) {
    var page = args.object;
    page.bindingContext = vmModule.mainViewModel.get("selectedItem");
}
exports.pageNavigatedTo = pageNavigatedTo;
function onRefreshTap(args) {
}
exports.onRefreshTap = onRefreshTap;
//# sourceMappingURL=device-details.js.map