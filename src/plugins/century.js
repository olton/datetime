import {Datetime} from "../core/class.js";

const centuryMixin = {
    century() {
        return Math.ceil(this.year() / 100);
    }
};

// Реєстрація форматера для Century
Datetime.formatters.registerFormatter('century', (instance, format, locale) => {
    const matches = {
        C: instance.century()
    };

    return format.replace(/(\[[^\]]+])|C/g, (match, $1) => $1 || matches[match]);
});

Object.assign(Datetime.prototype, centuryMixin);
