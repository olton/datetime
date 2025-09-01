import {DEFAULT_FORMAT} from "../helpers/consts.js"
import {Datetime} from "../core/class.js";

const fnFormat = Datetime.prototype.format;

const buddhistMixin = {
    buddhist() {
        return this.year() + 543;
    }
}

// Реєстрація форматера для Buddhist календаря
Datetime.formatters.registerFormatter('buddhist', (instance, format, locale) => {
    const matches = {
        BB: (instance.buddhist() + "").slice(-2),
        BBBB: instance.buddhist()
    };

    return format.replace(/(\[[^\]]+])|B{4}|B{2}/g, (match, $1) => $1 || matches[match]);
});

Object.assign(Datetime.prototype, buddhistMixin)
