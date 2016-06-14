var http = require("http");
var dialogs = require("ui/dialogs");
function get(url) {
    return new Promise(function (resolve, reject) {
        dialogs.alert(url);
        http.request({
            url: "http://" + url,
            method: 'GET',
        })
            .then(function (response) {
            var jsonObj = response.content.toJSON();
            resolve(jsonObj);
        }, function (err) {
            dialogs.alert(err);
        });
    });
}
exports.get = get;
function post(url, data) {
    return new Promise(function (resolve, reject) {
        http.request({
            url: url,
            method: 'POST',
            content: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(function (response) {
            resolve(response);
        }, function (err) {
            dialogs.alert(err);
        });
    });
}
exports.post = post;
//# sourceMappingURL=requester.js.map