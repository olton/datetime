import {Datetime} from "../";

Object.assign(Datetime.prototype, {
    isLeapYear(){
        const year = this.year();
        return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    }
})
