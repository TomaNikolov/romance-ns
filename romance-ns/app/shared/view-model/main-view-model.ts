import observable = require("data/observable");
import observableArray = require("data/observable-array");
import {DeviceItem} from "../models/device-item";

var items = new observableArray.ObservableArray < DeviceItem > ();
items.push(new DeviceItem({
			"type": "actor",
			"info": "Light dimmer",
			"mode": "range",
			"kind": "light",
			"min": 0,
			"max": 1023,
			"queryParam": "A1",
			"currentValue": "123"
		}));

export var mainViewModel = new observable.Observable();
mainViewModel.set("items", items);