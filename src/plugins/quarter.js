import {Datetime, datetime} from "../core/class.js";

// Зберігаємо оригінальний метод add
const originalAdd = Datetime.prototype.add;

const quarterMixin = {
    quarter() {
        const month = this.month();

        if (month <= 2) return 1;
        if (month <= 5) return 2;
        if (month <= 8) return 3;
        return 4;
    },

    add(val, to) {
        if (to === "quarter") {
            return this.month(this.month() + val * 3);
        }
        // Викликаємо оригінальний метод add для інших випадків
        return originalAdd.call(this, val, to);
    },

    addQuarter(v) {
        return this.add(v, "quarter");
    }
};

// Реєстрація стратегій для кварталу
Datetime.alignStrategies.registerAlignStrategy('quarter', (date) => {
    const cloned = date.clone();
    const quarter = cloned.quarter();
    const quarterStartMonth = (quarter - 1) * 3; // 0, 3, 6, 9

    return Datetime.alignStrategies
        .executeAlign(cloned, 'day') // Спочатку встановлюємо час на 00:00:00
        .month(quarterStartMonth) // Встановлюємо перший місяць кварталу
        .day(1); // Встановлюємо перший день місяця
});

Datetime.alignStrategies.registerAlignEndStrategy('quarter', (date) => {
    const cloned = date.clone();
    const quarter = cloned.quarter();
    const quarterEndMonth = quarter * 3 - 1; // 2, 5, 8, 11

    // Спочатку переходимо до останнього місяця кварталу
    const endOfQuarter = cloned.month(quarterEndMonth).day(1);

    // Знаходимо останній день цього місяця
    const daysInMonth = endOfQuarter.clone().add(1, 'month').day(1).add(-1, 'day').day();

    return Datetime.alignStrategies
        .executeAlignEnd(endOfQuarter.day(daysInMonth), 'day'); // Встановлюємо час на 23:59:59.999
});

Object.assign(Datetime.prototype, quarterMixin);