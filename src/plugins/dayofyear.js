import {Datetime} from "../core/class.js"
import "./isleapyear.js"

Object.assign(Datetime.prototype, {
    dayOfYear(){
        const dayCount = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
        const month = this.month();
        const day = this.day();
        return dayCount[month] + day + ((month > 1 && this.isLeapYear()) ? 1 : 0);
    }
})
