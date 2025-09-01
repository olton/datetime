import {DEFAULT_FORMAT} from "./consts.js";

/* Додавання кастомного форматера
Datetime.formatters.registerFormatter('custom', (instance, format) => {
    return format.replace(/SEASON/g, () => {
        const month = instance.month();
        if (month >= 2 && month <= 4) return "Spring";
        if (month >= 5 && month <= 7) return "Summer";
        if (month >= 8 && month <= 10) return "Autumn";
        return "Winter";
    });
});
*/


class FormatterSystem {
    constructor() {
        this.formatters = new Map();
        this.preprocessors = [];
        this.postprocessors = [];
    }

    // Реєстрація форматера
    registerFormatter(name, formatter) {
        if (this.formatters.has(name)) {
            console.warn(`Formatter "${name}" is already registered. Overriding.`);
        }
        this.formatters.set(name, formatter);
    }

    // Видалення форматера
    unregisterFormatter(name) {
        this.formatters.delete(name);
    }

    // Додавання препроцесора (виконується перед форматуванням)
    addPreprocessor(fn) {
        this.preprocessors.push(fn);
    }

    // Додавання постпроцесора (виконується після форматування)
    addPostprocessor(fn) {
        this.postprocessors.push(fn);
    }

    // Обробка формату через усі зареєстровані форматери
    processFormat(instance, format, locale) {
        let processedFormat = format || DEFAULT_FORMAT;

        // Запускаємо препроцесори
        for (const preprocessor of this.preprocessors) {
            processedFormat = preprocessor(instance, processedFormat, locale) || processedFormat;
        }

        // Запускаємо форматери в порядку реєстрації
        for (const [name, formatter] of this.formatters) {
            try {
                processedFormat = formatter(instance, processedFormat, locale) || processedFormat;
            } catch (error) {
                console.error(`Error in formatter "${name}":`, error);
            }
        }

        // Запускаємо постпроцесори
        for (const postprocessor of this.postprocessors) {
            processedFormat = postprocessor(instance, processedFormat, locale) || processedFormat;
        }

        return processedFormat;
    }

    // Отримання списку всіх зареєстрованих форматерів
    getRegisteredFormatters() {
        return Array.from(this.formatters.keys());
    }

    // Очистка всіх форматерів
    clear() {
        this.formatters.clear();
        this.preprocessors.length = 0;
        this.postprocessors.length = 0;
    }
}

// Глобальна інстанція системи форматерів
const formatterSystem = new FormatterSystem();

export { FormatterSystem, formatterSystem };