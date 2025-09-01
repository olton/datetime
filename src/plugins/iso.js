import {Datetime} from "../core/class.js";
import {not} from "../helpers/not.js";

const isoMixin = {
    isoWeekDay(val) {
        let wd = (this.weekDay() + 6) % 7 + 1;

        if (!arguments.length || (not(val))) {
            return wd;
        }

        return this.addDay(val - wd);
    }
};

// Реєстрація стратегій для ISO тижня
Datetime.alignStrategies.registerAlignStrategy('isoWeek', (date) => {
    const cloned = date.clone();
    const isoDay = cloned.isoWeekDay(); // 1 = понеділок, 7 = неділя
    const daysToSubtract = isoDay - 1; // Скільки днів відняти щоб дістатися понеділка

    return Datetime.alignStrategies
        .executeAlign(cloned, 'day') // Спочатку встановлюємо час на 00:00:00
        .addDay(-daysToSubtract); // Потім йдемо до понеділка
});

Datetime.alignStrategies.registerAlignEndStrategy('isoWeek', (date) => {
    const cloned = date.clone();
    const isoDay = cloned.isoWeekDay(); // 1 = понеділок, 7 = неділя
    const daysToAdd = 7 - isoDay; // Скільки днів додати щоб дістатися неділі

    return Datetime.alignStrategies
        .executeAlignEnd(cloned, 'day') // Спочатку встановлюємо час на 23:59:59.999
        .addDay(daysToAdd); // Потім йдемо до неділі
});

// Реєстрація форматера для ISO
Datetime.formatters.registerFormatter('iso', (instance, format, locale) => {
    const matches = {
        I: instance.isoWeekDay()
    };

    return format.replace(/(\[[^\]]+])|I{1,2}/g, (match, $1) => $1 || matches[match]);
});

Object.assign(Datetime.prototype, isoMixin);
