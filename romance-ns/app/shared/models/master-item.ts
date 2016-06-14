import observable = require("data/observable");
import observableArray = require("data/observable-array");
import {DeviceItem} from "../models/device-item";

export class MasterItem extends observable.Observable {
    constructor(public guid:string, public displayName:string, public items:observableArray.ObservableArray < DeviceItem >) {
        super();
    }
}