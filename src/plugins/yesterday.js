import {Datetime, datetime} from "../";

Object.assign(Datetime, {
    isYesterday(date){
        const d = datetime(date).align("day");
        const c = datetime().align('day').add(-1, 'day');

        return d.time() === c.time();
    }
});

Object.assign(Datetime.prototype, {
    isYesterday(){
        return Datetime.isYesterday(this);
    },

    yesterday(){
        if (!this.mutable) {
            return this.clone().immutable(false).add(-1, 'day').immutable(!this.mutable);
        }
        return this.add(-1, 'day');
    }
})
