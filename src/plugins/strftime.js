import {REGEX_FORMAT_STRFTIME, DEFAULT_FORMAT_STRFTIME} from "../helpers/consts.js"
import {Datetime, datetime} from "../core/class.js";
import {lpad} from "../helpers/lpad.js";

import "./century.js"
import "./dayofyear.js"
import "./hour12.js"
import "./weeknumber.js"
import "./timezone.js"
import "./iso.js"

Object.assign(Datetime.prototype, {
    strftime(fmt, locale){
        const format = fmt || DEFAULT_FORMAT_STRFTIME;
        const names = Datetime.getLocale(locale || this.locale);
        const year = this.year(), year2 = this.year2(), month = this.month(), day = this.day(), weekDay = this.weekDay();
        const hour = this.hour(), hour12 = this.hour12(), minute = this.minute(), second = this.second(), ms = this.ms(), time = this.time();
        const aDay = lpad(day, 0, 2),
            aMonth = lpad(month + 1, 0, 2),
            aHour = lpad(hour, 0, 2),
            aHour12 = lpad(hour12, 0, 2),
            aMinute = lpad(minute, 0, 2),
            aSecond = lpad(second, 0, 2),
            aMs = lpad(ms, 0, 3);

        const that = this;

        const thursday = function(){
            return datetime(that.value).day(that.day() - ((that.weekDay() + 6) % 7) + 3);
        };

        const matches = {
            '%a': names.weekdaysShort[weekDay],
            '%A': names.weekdays[weekDay],
            '%b': names.monthsShort[month],
            '%h': names.monthsShort[month],
            '%B': names.months[month],
            '%c': this.toString().substring(0, this.toString().indexOf(" (")),
            '%C': this.century(),
            '%d': aDay,
            '%D': [aDay, aMonth, year].join("/"),
            '%e': day,
            '%F': [year, aMonth, aDay].join("-"),
            '%G': thursday().year(),
            '%g': (""+thursday().year()).slice(2),
            '%H': aHour,
            '%I': aHour12,
            '%j': lpad(this.dayOfYear(), 0, 3),
            '%k': aHour,
            '%l': aHour12,
            '%m': aMonth,
            '%n': month + 1,
            '%M': aMinute,
            '%p': this.ampm(),
            '%P': this.ampm(true),
            '%s': Math.round(time / 1000),
            '%S': aSecond,
            '%u': this.isoWeekDay(),
            '%V': this.isoWeekNumber(),
            '%w': weekDay,
            '%x': this.toLocaleDateString(),
            '%X': this.toLocaleTimeString(),
            '%y': year2,
            '%Y': year,
            '%z': this.timezone().replace(":", ""),
            '%Z': this.timezoneName(),
            '%r': [aHour12, aMinute, aSecond].join(":") + " " + this.ampm(),
            '%R': [aHour, aMinute].join(":"),
            "%T": [aHour, aMinute, aSecond].join(":"),
            "%Q": aMs,
            "%q": ms,
            "%t": this.timezone()
        };

        return format.replace(
            REGEX_FORMAT_STRFTIME,
            (match) => (matches[match] === 0 || matches[match] ? matches[match] : match)
        );
    }
});
