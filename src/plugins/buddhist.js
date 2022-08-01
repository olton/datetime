import {DEFAULT_FORMAT} from "../helpers/consts.js"
import {Datetime} from "../core/class.js";

const fnFormat = Datetime.prototype.format;

const buddhistMixin = {
    buddhist() {
        return this.year() + 543;
    },

    format(format, locale) {
        format = format || DEFAULT_FORMAT;
        const matches = {
            BB: (this.buddhist() + "").slice(-2),
            BBBB: this.buddhist()
        }
        let result = format.replace(/(\[[^\]]+])|B{4}|B{2}/g, (match, $1) => $1 || matches[match])

        return fnFormat.bind(this)(result, locale)
    }
}

Object.assign(Datetime.prototype, buddhistMixin)
