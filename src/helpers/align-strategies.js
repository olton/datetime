import {C} from "./consts.js";

/* Приклад: Реєстрація стратегії для ISO тижня
Datetime.alignStrategies.registerAlignStrategy('isoWeek', (date) => {
    const cloned = date.clone();
    const isoDay = cloned.isoWeekDay(); // 1 = понеділок, 7 = неділя
    const daysToSubtract = isoDay - 1; // Скільки днів відняти щоб дістатися понеділка

    return Datetime.alignStrategies
        .executeAlign(cloned, 'day') // Спочатку встановлюємо час на 00:00:00
        .addDay(-daysToSubtract); // Потім йдемо до понеділка
});
*/

class AlignStrategiesSystem {
    constructor() {
        this.alignStrategies = new Map();
        this.alignEndStrategies = new Map();
        this.isInitialized = false;
    }

    // Реєстрація стратегії для align
    registerAlignStrategy(name, strategy) {
        if (this.alignStrategies.has(name)) {
            console.warn(`Align strategy "${name}" is already registered. Overriding.`);
        }
        this.alignStrategies.set(name, strategy);
    }

    // Реєстрація стратегії для alignEnd
    registerAlignEndStrategy(name, strategy) {
        if (this.alignEndStrategies.has(name)) {
            console.warn(`AlignEnd strategy "${name}" is already registered. Overriding.`);
        }
        this.alignEndStrategies.set(name, strategy);
    }

    // Виконання стратегії align
    executeAlign(date, align) {
        if (this.alignStrategies.has(align)) {
            return this.alignStrategies.get(align)(date);
        }
        // Fallback до базової логіки
        return this.defaultAlign(date, align);
    }

    // Виконання стратегії alignEnd
    executeAlignEnd(date, align) {
        if (this.alignEndStrategies.has(align)) {
            return this.alignEndStrategies.get(align)(date);
        }
        // Fallback до базової логіки
        return this.defaultAlignEnd(date, align);
    }

    // Базова логіка align
    defaultAlign(date, align) {
        let _date = date.clone ? date.clone() : date;
        let result, temp;

        switch (align) {
            case C.ms:
            case 'ms':
                result = _date;
                break;
            case C.s:
            case 's':
            case 'second':
                result = _date.ms(0);
                break;
            case C.m:
            case 'm':
            case 'minute':
                result = this.executeAlign(_date, 's').second(0);
                break;
            case C.h:
            case 'h':
            case 'hour':
                result = this.executeAlign(_date, 'm').minute(0);
                break;
            case C.D:
            case 'D':
            case 'day':
                result = this.executeAlign(_date, 'h').hour(0);
                break;
            case C.M:
            case 'M':
            case 'month':
                result = this.executeAlign(_date, 'D').day(1);
                break;
            case C.Y:
            case 'Y':
            case 'year':
                result = this.executeAlign(_date, 'M').month(0);
                break;
            case C.W:
            case 'W':
            case 'week':
                temp = _date.weekDay();
                result = this.executeAlign(_date, 'D').addDay(-temp);
                break;
            default:
                result = _date;
        }
        return result;
    }

    // Базова логіка alignEnd
    defaultAlignEnd(date, align) {
        let _date = date.clone ? date.clone() : date;
        let result, temp;

        switch (align) {
            case C.ms:
            case 'ms':
                result = _date;
                break;
            case C.s:
            case 's':
            case 'second':
                result = _date.ms(999);
                break;
            case C.m:
            case 'm':
            case 'minute':
                result = this.executeAlignEnd(_date, 's').second(59);
                break;
            case C.h:
            case 'h':
            case 'hour':
                result = this.executeAlignEnd(_date, 'm').minute(59);
                break;
            case C.D:
            case 'D':
            case 'day':
                result = this.executeAlignEnd(_date, 'h').hour(23);
                break;
            case C.M:
            case 'M':
            case 'month':
                result = this.executeAlignEnd(_date, 'D').day(1).add(1, 'M').add(-1, 'D');
                break;
            case C.Y:
            case 'Y':
            case 'year':
                result = this.executeAlignEnd(_date, 'D').month(11).day(31);
                break;
            case C.W:
            case 'W':
            case 'week':
                temp = _date.weekDay();
                result = this.executeAlignEnd(_date, 'D').addDay(6 - temp);
                break;
            default:
                result = _date;
        }
        return result;
    }

    // Ініціалізація базових стратегій
    initializeBuiltInStrategies() {
        if (this.isInitialized) return;

        // Стратегії align - використовуємо як константи, так і рядки
        const alignMappings = [
            [C.ms, 'ms'],
            [C.s, 's', 'second'],
            [C.m, 'm', 'minute'],
            [C.h, 'h', 'hour'],
            [C.D, 'D', 'day'],
            [C.M, 'M', 'month'],
            [C.Y, 'Y', 'year'],
            [C.W, 'W', 'week']
        ];

        // Реєструємо стратегії для всіх варіантів назв
        for (const mappings of alignMappings) {
            const mainKey = mappings[0];
            for (const key of mappings) {
                this.alignStrategies.set(key, (date) => this.defaultAlign(date, mainKey));
                this.alignEndStrategies.set(key, (date) => this.defaultAlignEnd(date, mainKey));
            }
        }

        this.isInitialized = true;
    }

    // Отримання списку всіх стратегій
    getRegisteredAlignStrategies() {
        return Array.from(this.alignStrategies.keys());
    }

    getRegisteredAlignEndStrategies() {
        return Array.from(this.alignEndStrategies.keys());
    }

    // Видалення стратегій
    unregisterAlignStrategy(name) {
        this.alignStrategies.delete(name);
    }

    unregisterAlignEndStrategy(name) {
        this.alignEndStrategies.delete(name);
    }

    // Очистка всіх стратегій
    clear() {
        this.alignStrategies.clear();
        this.alignEndStrategies.clear();
        this.isInitialized = false;
    }
}

// Глобальна інстанція системи стратегій
const alignStrategiesSystem = new AlignStrategiesSystem();

export { AlignStrategiesSystem, alignStrategiesSystem };