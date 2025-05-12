import {DEFAULT_FORMAT} from "../helpers/consts.js"
import {Datetime, datetime} from "../core/class.js"
import {lpad} from "../helpers/lpad.js"
import "./timezone.js"

const fnFormat = Datetime.prototype.format;

Object.assign(Datetime.prototype, {
    // TODO Need optimisation
    weekNumber (weekStart = 0) {
        let nYear, nday, newYear, day, daynum, weeknum;

        newYear = datetime(this.year(), 0, 1);
        day = newYear.weekDay() - weekStart;
        day = (day >= 0 ? day : day + 7);
        daynum = Math.floor(
            (this.time() - newYear.time() - (this.utcOffset() - newYear.utcOffset()) * 60000) / 86400000
        ) + 1;

        if(day < 4) {
            weeknum = Math.floor((daynum + day - 1) / 7) + 1;
            if(weeknum > 52) {
                nYear = datetime(this.year() + 1, 0, 1);
                nday = nYear.weekDay() - weekStart;
                nday = nday >= 0 ? nday : nday + 7;
                weeknum = nday < 4 ? 1 : 53;
            }
        }
        else {
            weeknum = Math.floor((daynum + day - 1) / 7);
            // Якщо weeknum дорівнює 0, це означає, що дата належить до останнього тижня попереднього року
            if (weeknum === 0) {
                // Визначаємо останній тиждень попереднього року
                const lastDayPrevYear = datetime(this.year() - 1, 11, 31);
                weeknum = lastDayPrevYear.weekNumber(weekStart);

                // Але якщо ми використовуємо ISO стандарт (weekStart=1), і день знаходиться
                // на початку року, він може належати до 1-го тижня поточного року
                if (weekStart === 1 && daynum <= (7 - day)) {
                    weeknum = 1;
                }
            }
        }
        return weeknum;
    },

    isoWeekNumber(){
        const d = new Date(this.time());
        d.setHours(0, 0, 0, 0);
        // Встановлюємо на четвер поточного тижня (четвер має номер 4)
        d.setDate(d.getDate() + 3 - (d.getDay() + 6) % 7);
        // 4 січня завжди в першому тижні
        const jan4 = new Date(d.getFullYear(), 0, 4);
        // Встановлюємо на четвер тижня, що містить 4 січня
        jan4.setDate(jan4.getDate() + 3 - (jan4.getDay() + 6) % 7);
        // Рахуємо кількість тижнів між двома четвергами
        return 1 + Math.round(((d.getTime() - jan4.getTime()) / 86400000 - 3 + (jan4.getDay() + 6) % 7) / 7);
    },

    weeksInYear(weekStart = 0) {
        const curr = datetime(this.value);
        const lastDay = curr.month(11).day(31);
        const weekNum = lastDay.weekNumber(weekStart);

        // Якщо останній день року має номер тижня 1, 
        // і це перший день тижня (weekStart),
        // використовуємо передостанній день року
        if (weekNum === 1 && lastDay.weekDay() === weekStart) {
            return lastDay.add(-1, 'day').weekNumber(weekStart);
        }

        return weekNum;
    },
    
    // weeksInYear(weekStart){
    //     const curr = datetime(this.value);
    //     return curr.month(11).day(31).weekNumber(weekStart);
    // },

    format: function(format, locale){
        let matches, result, wn = this.weekNumber(), wni = this.isoWeekNumber();

        format = format || DEFAULT_FORMAT;

        matches = {
            W: wn,
            WW: lpad(wn, 0, 2),
            WWW: wni,
            WWWW: lpad(wni, 0, 2)
        };

        result = format.replace(/(\[[^\]]+])|W{1,4}/g, (match, $1) => $1 || matches[match]);

        return fnFormat.bind(this)(result, locale)
    }
})
