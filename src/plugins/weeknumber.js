import {DEFAULT_FORMAT} from "../helpers/consts.js"
import {Datetime, datetime} from "../core/class.js"
import {lpad} from "../helpers/lpad.js"
import "./timezone.js"

const fnFormat = Datetime.prototype.format;

// Кеш для оптимізації обчислень
const weekNumberCache = new Map();
const MILLISECONDS_PER_DAY = 86400000;

Object.assign(Datetime.prototype, {
    weekNumber(weekStart = 0) {
        // Створюємо унікальний ключ для кешування
        const cacheKey = `${this.time()}_${weekStart}`;
        if (weekNumberCache.has(cacheKey)) {
            return weekNumberCache.get(cacheKey);
        }

        const year = this.year();
        const newYear = datetime(year, 0, 1);
        const newYearWeekDay = newYear.weekDay();

        // Оптимізоване обчислення дня року
        const dayOfYear = Math.floor((this.time() - newYear.time() -
            (this.utcOffset() - newYear.utcOffset()) * 60000) / MILLISECONDS_PER_DAY) + 1;

        // Нормалізація дня тижня відносно weekStart
        const adjustedNewYearWeekDay = (newYearWeekDay - weekStart + 7) % 7;

        let weekNumber;

        if (adjustedNewYearWeekDay < 4) {
            // Перший тиждень року має >= 4 дні
            weekNumber = Math.floor((dayOfYear + adjustedNewYearWeekDay - 1) / 7) + 1;

            // Перевіряємо, чи не належить тиждень наступному року
            if (weekNumber > 52) {
                const nextYear = datetime(year + 1, 0, 1);
                const nextYearWeekDay = (nextYear.weekDay() - weekStart + 7) % 7;
                weekNumber = nextYearWeekDay < 4 ? 1 : 53;
            }
        } else {
            // Перший тиждень року почнеться пізніше
            weekNumber = Math.floor((dayOfYear + adjustedNewYearWeekDay - 1) / 7);

            if (weekNumber === 0) {
                // Дата належить останньому тижню попереднього року
                if (weekStart === 1 && dayOfYear <= (7 - adjustedNewYearWeekDay)) {
                    weekNumber = 1;
                } else {
                    // Рекурсивно обчислюємо для останнього дня попереднього року
                    const lastDayPrevYear = datetime(year - 1, 11, 31);
                    weekNumber = lastDayPrevYear.weekNumber(weekStart);
                }
            }
        }

        // Кешуємо результат
        weekNumberCache.set(cacheKey, weekNumber);

        // Очищуємо кеш якщо він стає занадто великим
        if (weekNumberCache.size > 1000) {
            const keysToDelete = Array.from(weekNumberCache.keys()).slice(0, 500);
            keysToDelete.forEach(key => weekNumberCache.delete(key));
        }

        return weekNumber;
    },

    isoWeekNumber() {
        const cacheKey = `iso_${this.time()}`;
        if (weekNumberCache.has(cacheKey)) {
            return weekNumberCache.get(cacheKey);
        }

        // Оригінальний правильний алгоритм ISO 8601
        const d = new Date(this.time());
        d.setHours(0, 0, 0, 0);

        // Встановлюємо дату на четвер поточного тижня (ISO тиждень завжди містить четвер)
        d.setDate(d.getDate() + 3 - (d.getDay() + 6) % 7);

        // Перший четвер року (4 січня завжди в першому ISO тижні)
        const jan4 = new Date(d.getFullYear(), 0, 4);
        jan4.setDate(jan4.getDate() + 3 - (jan4.getDay() + 6) % 7);

        // Обчислюємо різницю в тижнях між двома четвергами
        const weekNumber = 1 + Math.round(((d.getTime() - jan4.getTime()) / MILLISECONDS_PER_DAY - 3 + (jan4.getDay() + 6) % 7) / 7);

        weekNumberCache.set(cacheKey, weekNumber);
        return weekNumber;
    },

    weeksInYear(weekStart = 0) {
        const cacheKey = `weeks_${this.year()}_${weekStart}`;
        if (weekNumberCache.has(cacheKey)) {
            return weekNumberCache.get(cacheKey);
        }

        // Оптимізовано: використовуємо 28 грудня замість 31, 
        // оскільки 28 грудня завжди в останньому тижні року
        const dec28 = datetime(this.year(), 11, 28);
        let weekNum = dec28.weekNumber(weekStart);

        // Якщо 28 грудня показує тиждень 1, то рік має 52 тижні
        if (weekNum === 1) {
            weekNum = 52;
        }

        weekNumberCache.set(cacheKey, weekNum);
        return weekNum;
    },

    format: function(format, locale) {
        format = format || DEFAULT_FORMAT;

        // Оптимізація: обчислюємо номери тижнів тільки якщо вони потрібні
        const hasWeekTokens = /W{1,4}/.test(format);
        if (!hasWeekTokens) {
            return fnFormat.bind(this)(format, locale);
        }

        const weekNum = this.weekNumber();
        const isoWeekNum = this.isoWeekNumber();

        const matches = {
            W: weekNum,
            WW: lpad(weekNum, 0, 2),
            WWW: isoWeekNum,
            WWWW: lpad(isoWeekNum, 0, 2)
        };

        const result = format.replace(/(\[[^\]]+])|W{1,4}/g, (match, $1) => $1 || matches[match]);
        return fnFormat.bind(this)(result, locale);
    }
});