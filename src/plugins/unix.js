import {Datetime, datetime} from "../core/class.js";
import {not} from "../helpers/not.js";

Object.assign(Datetime, {
    timestamp(){
        return new Date().getTime() / 1000;
    }
})

Object.assign(Datetime.prototype, {
    unix(val) {
        let _val;

        if (!arguments.length || (not(val))) {
            return Math.floor(this.valueOf() / 1000)
        }

        _val = val * 1000;

        if (this.mutable) {
            return this.time(_val);
        }

        return datetime(this.value).time(_val);
    },

    timestamp(){
        return this.unix();
    }
});
