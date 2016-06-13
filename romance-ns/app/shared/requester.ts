import {Config} from "./config";
import http = require("http");
import dialogs = require("ui/dialogs");

export function get(url) {
    return new Promise(function(resolve, reject){
    	 http.request({
            url: Config.apiUrl + url,
            method: 'GET',
        })
        .then(function(response){
             var jsonObj = response.content.toJSON();
             resolve(jsonObj);
         }, function (err) {
            dialogs.alert(err);
        });
    });
}

export function post(url, data) {
    return new Promise(function(resolve, reject){
    	http.request({
         url: Config.apiUrl + url,
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