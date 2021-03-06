import {DEFAULT_FORMAT} from "../helpers/consts.js";
import {Datetime, datetime} from "../core/class.js";
import {not} from "../helpers/not.js";

const fnFormat = Datetime.prototype.format;
const fnAlign = Datetime.align;
const fnAlignEnd = Datetime.alignEnd;

Object.assign(Datetime, {
    align(d, align) {
        let date = datetime(d), result, temp;

        switch(align) {
            case "isoWeek":
                temp = date.isoWeekDay();
                result = fnAlign(date, 'day').addDay(-temp + 1);
                break; // isoWeek

            default: result = fnAlign.apply(undefined, [date, align]);
        }

        return result;
    },

    alignEnd (d, align) {
        let date = datetime(d), result, temp;

        switch(align) {
            case "isoWeek":
                temp = date.isoWeekDay();
                result = fnAlignEnd(date, 'day').addDay(7 - temp);
                break; // isoWeek

            default: result = fnAlignEnd.apply(undefined, [date, align]);
        }

        return result;
    }
})

Object.assign(Datetime.prototype, {
    isoWeekDay(val){
        let wd = (this.weekDay() + 6) % 7 + 1;

        if (!arguments.length || (not(val))) {
            return wd;
        }

        return this.addDay(val - wd);
    },

    format(format, locale){
        format = format || DEFAULT_FORMAT;
        const matches = {
            I: this.isoWeekDay()
        }
        let result = format.replace(/(\[[^\]]+])|I{1,2}/g, (match, $1) => $1 || matches[match])
        return fnFormat.bind(this)(result, locale)
    }
})
