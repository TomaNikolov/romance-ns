import observable = require("data/observable");
import dialogs = require("ui/dialogs");
import observableArray = require("data/observable-array");
import {DeviceItem} from "../models/device-item";
import {NewDeviceItem} from "../../shared/models/new-device";
import {MasterItem} from "../models/master-item";
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
        
        return that.getStoredDevicesDetails()
        	.then(function(storedDevices) {
            	var items = new observableArray.ObservableArray < MasterItem > ();
            
            	for (let deviceDetails of storedDevices) {
                    items.push(new MasterItem(deviceDetails.guid, deviceDetails.displayName, deviceDetails.ipAddress, that.getChildren(deviceDetails)))
                }
            
            	that.set("items", items);
        	})
        	.catch(function(e) {
            	that.set("items", []);
        	});
    }

	getChildren(deviceDetails:any) {
        var children = new observableArray.ObservableArray < DeviceItem >();
        
        _.forEach(deviceDetails.items, function(child) {
            children.push(new DeviceItem(child));
        });
        
        return children;
    }
    
    addDevice(newDeviceInfo: NewDeviceItem) {
        var that = this;
        
        return that.getDevicesDB()
        	.then(function(db) {
            
            	return that.getDeviceDetails(newDeviceInfo)
                	.then(function(deviceDetails) {
                    	var items = that.get("items");
                    
                    	items.push(new MasterItem(deviceDetails.guid, deviceDetails.displayName, deviceDetails.ipAddress, that.getChildren(deviceDetails)));
                    
                    	return db.execSQL("insert into StoredDevices values (?, ?)", [
                            newDeviceInfo.ipAddress,
                            newDeviceInfo.displayName
                        ]);
                	});
        	});
    }

	refreshDevice(device:MasterItem) {
        var that = this,
            children = that.getDeviceDetails(device).items;
        
        dialogs.alert(children.length);
        
        device.set("items", children);
    }
    
	getDeviceDetails(newDeviceInfo: any) {
         return requester.get(newDeviceInfo.ipAddress)
                .then(function (response) {
                    var deviceInfo = {
                        guild: response.device,
                        displayName: newDeviceInfo.displayName,
                        ipAddress: newDeviceInfo.ipAddress,
                        items: response.actions
                    }

                    return Promise.resolve(deviceInfo);
                });
    }

    getStoredDevicesDetails() {
        var that = this;

        return that.getDevicesDB()
        	.then(function(db) {
            	return db.all("select * from StoredDevices");
        	})
        	.then(function(dbDevices) {
            	var promises = [];
            
            	_.forEach(dbDevices, function(dbDevice) {
                    promises.push(that.getDeviceDetails(dbDevice));
                });
            
            	return Promise.all(promises);
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
            
            	return db.execSQL('create table if not exists StoredDevices (`ipAddress` text, `displayName` text)')
                    .then(function() {
                    	that._db = db;
            	
            			return that._db;
                	});
        	});
    }
}

export var mainViewModel = new DevicesViewModel();