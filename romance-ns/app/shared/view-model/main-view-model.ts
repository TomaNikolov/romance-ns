import observable = require("data/observable");
import dialogs = require("ui/dialogs");
import observableArray = require("data/observable-array");
import {DeviceItem} from "../models/device-item";
import {NewDeviceItem} from "../../shared/models/new-device";
import requester = require("./../requester");
import http = require("http");

var Sqlite = require( "nativescript-sqlite");
var _ = require("lodash");

class DevicesViewModel extends observable.Observable {
	private _db: any = null;
    
    constructor() {
        super();
        
        var that = this;
        
        that.getAndParseDevices();
    }
    
    getAndParseDevices() {
        var that = this;
        
        return that.getStoredDevices()
        	.then(function(storedDevices) {
            	var items = new observableArray.ObservableArray < DeviceItem > ();
            
            	for (let device of storedDevices) {
                    items.push(device);
                }
            
            	that.set("items", items);
        	})
        	.catch(function(e) {
            	that.set("items", []);
        	});
    }
    
    addDevice(newDeviceInfo: NewDeviceItem) {
        var that = this;
        
        return that.getDevicesDB()
        	.then(function(db) {
            
            	return that.getDeviceDetails(newDeviceInfo)
                	.then(function(deviceDetails) {
                    	var items = that.get("items");
                    
                    	items.push(new DeviceItem(deviceDetails));
                    	return db.execSQL("insert into StoredDevices values (?, ?, ?, ?, ?, ?, ?, ?)", [
                            deviceDetails.type,
                            deviceDetails.info,
                            deviceDetails.mode,
                            deviceDetails.kind,
                            deviceDetails.min,
                            deviceDetails.max,
                            deviceDetails.queryParam,
                            deviceDetails.currentValue
                        ]);
                	});
        	});
    }
    
	getDeviceDetails(newDeviceInfo: NewDeviceItem) {
        return Promise.resolve({
                "type": "actor",
                "info": "Light dimmer",
                "mode": "range",
                "kind": "light",
                "min": 0,
                "max": 1023,
                "queryParam": "A1",
                "currentValue": "123"
            });
    }

    getStoredDevices() {
        var that = this;

        return that.getDevicesDB()
        	.then(function(db) {
            	return db.all("select * from StoredDevices");
        	})
        	.then(function(dbDevices) {
            	return _.map(dbDevices, function(dbDevice) {
                    return new DeviceItem(dbDevice);
                });
            
            	return dbDevices;
        	});
    }
    
    getDevicesDB() {
        var that = this;
        
        if (that._db) {
            return Promise.resolve(that._db);
        }

        return new Sqlite("storedDevices.sqlite")
            .then(function(db) {
            	db.resultType(Sqlite.RESULTSASOBJECT);
            
            	return db.execSQL('create table if not exists StoredDevices (`type` text, `info` text, `mode` text, `kind` text, `min` numeric, `max` numeric, `queryParam` text, `currentValue` numeric)')
                    .then(function() {
                    	that._db = db;
            	
            			return that._db;
                	});
        	});
    }
}

export var mainViewModel = new DevicesViewModel();