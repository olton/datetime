import {Datetime, datetime} from "../core/class.js";

Object.assign(Datetime, {
    isToday(date){
        const d = datetime(date).align("day");
        const c = datetime().align('day');

        return d.time() === c.time();
    }
})

Object.assign(Datetime.prototype, {
    isToday(){
        return Datetime.isToday(this);
    },

    today(){
        const now = datetime();

        if (!this.mutable) {
            return now;
        }
        return this.val(now.val());
    }
})
