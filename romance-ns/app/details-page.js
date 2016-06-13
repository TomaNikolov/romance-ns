"use strict";
var vmModule = require("./main-view-model");
// Event handler for Page "navigatedTo" event attached in details-page.xml
function pageNavigatedTo(args) {
    var page = args.object;
    page.bindingContext = vmModule.mainViewModel.get("selectedItem");
}
exports.pageNavigatedTo = pageNavigatedTo;
//# sourceMappingURL=details-page.js.map