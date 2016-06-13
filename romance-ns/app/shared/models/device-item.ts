import {ActionType} from "../enums/action-type";
import {ActionMode} from "../enums/action-mode";

export class DeviceItem {
    constructor(fromObject:Object) {
        for(var propertyName in fromObject) {
            this[propertyName] = fromObject[propertyName];
        }
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

	private _value:Number = 0;
    get value():Number {
        return this._value;
    }
    set value(value:Number) {
        this._value = value;
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
}