import {DEFAULT_FORMAT} from "../helpers/consts";
import {Datetime} from "../core/class";

const fnFormat = Datetime.prototype.format;

Object.assign(Datetime.prototype, {
    century(){
        return Math.ceil(this.year()/100);
    },

    format(format, locale){
        format = format || DEFAULT_FORMAT;

        const matches = {
            C: this.century()
        }

        let fmt = format.replace(/(\[[^\]]+])|C/g, (match, $1) => $1 || matches[match])

        return fnFormat.bind(this)(fmt, locale)
    }
})
