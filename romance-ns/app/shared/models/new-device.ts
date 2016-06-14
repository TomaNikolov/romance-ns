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
}