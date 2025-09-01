import {Datetime} from "../core/class.js";
import {lpad} from "../helpers/lpad.js";

const hour12Mixin = {
    ampm(isLowerCase) {
        let val = this.hour() < 12 ? "AM" : "PM";
        return isLowerCase ? val.toLowerCase() : val;
    },

    hour12: function(h, p) {
        let hour = h;

        if (arguments.length === 0) {
            const hour24 = this.hour();
            return hour24 % 12 || 12;
        }

        p = p || 'am';

        if (p.toLowerCase() === "pm") {
            hour += 12;
        }

        return this.hour(hour);
    }
};

// Реєстрація форматера для 12-годинний формат
Datetime.formatters.registerFormatter('hour12', (instance, format, locale) => {
    const h12 = instance.hour12();
    const matches = {
        a: "[" + instance.ampm(true) + "]",
        A: "[" + instance.ampm(false) + "]",
        h: h12,
        hh: lpad(h12, 0, 2)
    };

    return format.replace(/(\[[^\]]+])|a|A|h{1,2}/g, (match, $1) => $1 || matches[match]);
});

Object.assign(Datetime.prototype, hour12Mixin);
