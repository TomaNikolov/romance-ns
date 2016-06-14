import {ActionType} from "../enums/action-type";
import {ActionMode} from "../enums/action-mode";
import observable = require("data/observable");
import dialogs = require("ui/dialogs");
import requester = require("./../requester");

export class DeviceItem extends observable.Observable  {
    constructor(fromObject:Object) {
        super();
        var that = this;
        for(var propertyName in fromObject) {
            this[propertyName] = fromObject[propertyName];
        }
        
        that.addEventListener(observable.Observable.propertyChangeEvent, that.changeState.bind(that));
    }

    private _type:ActionType = ActionType.actor;
    get type():ActionType {
        return this._type;
    }
    set type(type:ActionType) {
        this._type = type;
    }

	private _info:string = "";
    get info():string {
        return this._info;
    }
    set info(info:string) {
        this._info = info;
    }

	private _mode:ActionMode = ActionMode.toggle;
    get mode():ActionMode {
        return this._mode;
    }
    set mode(mode:ActionMode) {
        this._mode = mode;
    }

	private _kind:string = "";
    get kind():string {
        return this._kind;
    }
    set kind(kind:string) {
        this._kind = kind;
    }

	private _queryParam:string = "";
    get queryParam():string {
        return this._queryParam;
    }
    set queryParam(queryParam:string) {
        this._queryParam = queryParam;
    }

	private _currentValue:Number = 0;
    get currentValue():Number {
        return this._currentValue;
    }
    set currentValue(currentValue:Number) {
        this._currentValue = currentValue;
        
        this.set("currentBoolValue", !!currentValue);
    }

	private _currentBoolValue:boolean;
    get currentBoolValue():boolean {
        return this._currentBoolValue;
    }
    set currentBoolValue(currentBoolValue:boolean) {
        this._currentBoolValue = currentBoolValue;
    }

	private _minValue:Number = Number.NaN;
    get minValue():Number {
        return this._minValue;
    }
    set minValue(minValue:Number) {
        this._minValue = minValue;
    }

	private _maxValue:Number = Number.NaN;
    get maxValue():Number {
        return this._maxValue;
    }
    set maxValue(maxValue:Number) {
        this._maxValue = maxValue;
    }

	get actionIcon(){
        switch(this.mode){
            case "range" :
            	return "\uf10d";
            case "toggle" : {
                if(this.kind === 'pump') {
                    return "\uf10f";
                } else
                	return "\uf13e";
            }
            case "temp" :
            	return "\uf127";
            case "humidity" :
            	return "\uf15e";
            default:
            	return "\uf14f";
        }
    }

	private _ipAddress:string = "";
    get ipAddress():string {
        return this._ipAddress;
    }
    set ipAddress(ipAddress:string) {
        this._ipAddress = ipAddress;
    }
        
    changeState (pcd: observable.PropertyChangeData) {
        var that = this;
        if(pcd.propertyName == "currentValue" || pcd.propertyName == "currentBoolValue" ){
            var value = pcd.value;
            if(pcd.propertyName == "currentBoolValue"){
                value = value ? 1 : 0; 
            }
            
			 requester.get(that.ipAddress + "/set?" + that.queryParam + "=" + value.toString())
                .then(function (response) {
                });
        }
	}
}