import observable = require("data/observable");
import observableArray = require("data/observable-array");
import {
    DeviceItem
} from "../models/device-item";
import requester = require("./../requester");
import dialogs = require("ui/dialogs");
import http = require("http");

var items = new observableArray.ObservableArray < DeviceItem > ();

requester.get('')
    .then(function (response) {
        var actions = response.actions
        actions.forEach(function (action) {
            items.push(new DeviceItem(action));
        })
    })

export var mainViewModel = new observable.Observable();
mainViewModel.set("items", items);