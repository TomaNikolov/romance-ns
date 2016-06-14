export class NewDeviceItem {
    constructor() {
    }
    
    private _ipAddress:string = "";
    get ipAddress():string {
        return this._ipAddress;
    }
    set ipAddress(ipAddress:string) {
        this._ipAddress = ipAddress;
    }

	private _displayName:string = "";
    get displayName():string {
        return this._displayName;
    }
    set displayName(displayName:string) {
        this._displayName = displayName;
    }
}