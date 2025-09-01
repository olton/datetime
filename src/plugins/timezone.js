import {Datetime} from "../core/class.js";

const timezoneMixin = {
    utcOffset() {
        return this.value.getTimezoneOffset();
    },

    timezone() {
        return this.toTimeString().replace(/.+GMT([+-])(\d{2})(\d{2}).+/, '$1$2:$3');
    },

    timezoneName() {
        return this.toTimeString().replace(/.+\((.+?)\)$/, '$1');
    }
};

// Реєстрація форматера для Timezone
Datetime.formatters.registerFormatter('timezone', (instance, format, locale) => {
    const matches = {
        Z: instance.utcMode ? "Z" : instance.timezone(),
        ZZ: instance.timezone().replace(":", ""),
        ZZZ: "[GMT]" + instance.timezone(),
        z: instance.timezoneName()
    };

    return format.replace(/(\[[^\]]+])|Z{1,3}|z/g, (match, $1) => $1 || matches[match]);
});

Object.assign(Datetime.prototype, timezoneMixin);
