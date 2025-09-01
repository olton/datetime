import {isNum} from "../helpers/is-num.js";
import {C, DEFAULT_FORMAT, DEFAULT_LOCALE, INVALID_DATE, M, REGEX_FORMAT} from "../helpers/consts.js";
import {required} from "../helpers/required.js";
import {isset} from "../helpers/isset.js";
import {not} from "../helpers/not.js";
import {lpad} from "../helpers/lpad.js";
import {formatterSystem} from '../helpers/format-system.js';
import {alignStrategiesSystem} from '../helpers/align-strategies.js';

import ua_locale from "../i18n/uk.js"
import de_locale from "../i18n/de.js"

const originalFormat = function(fmt, locale) {
    const format = fmt || DEFAULT_FORMAT;
    const names = Datetime.getLocale(locale || this.locale);
    const year = this.year(), year2 = this.year2(), month = this.month(), day = this.day(), weekDay = this.weekDay();
    const hour = this.hour(), minute = this.minute(), second = this.second(), ms = this.ms();
    const matches = {
        YY: year2,
        YYYY: year,
        M: month + 1,
        MM: lpad(month + 1, 0, 2),
        MMM: names.monthsShort[month],
        MMMM: names.months[month],
        D: day,
        DD: lpad(day, 0, 2),
        d: weekDay,
        dd: names.weekdaysMin[weekDay],
        ddd: names.weekdaysShort[weekDay],
        dddd: names.weekdays[weekDay],
        H: hour,
        HH: lpad(hour, 0, 2),
        m: minute,
        mm: lpad(minute,0, 2),
        s: second,
        ss: lpad(second,0, 2),
        sss: lpad(ms,0, 3)
    };

    return format.replace(REGEX_FORMAT, (match, $1) => $1 || matches[match]);
};

class Datetime {
    constructor() {
        const args = [].slice.call(arguments);
        this.value = new (Function.prototype.bind.apply(Date,  [this].concat(args) ) );
        this.locale = "en";
        this.weekStart = Datetime.locales["en"].weekStart;
        this.utcMode = false;
        this.mutable = true;

        if (!isNum(this.value.getTime())) {
            throw new Error(INVALID_DATE);
        }
    }

    static locales = {
        en: DEFAULT_LOCALE,
        ua: ua_locale,
        de: de_locale
    }

    static isDatetime(val){
        return val instanceof Datetime;
    }

    static now(asDate = false){
        return datetime()[asDate ? "val" : "time"]();
    }

    static parse(str = required()){
        return datetime(Date.parse(str));
    }

    static setLocale(name = required(), locale = required()){
        Datetime.locales[name] = locale;
    }

    static getLocale(name = "en"){
        return isset(Datetime.locales[name], false) ? Datetime.locales[name] : Datetime.locales["en"];
    }

    static align(date, align) {
        const _date = datetime(date);
        return alignStrategiesSystem.executeAlign(_date, align);
    }

    static alignEnd(date, align) {
        const _date = datetime(date);
        return alignStrategiesSystem.executeAlignEnd(_date, align);
    }

    immutable(v){
        this.mutable = !(not(v) ? true : v);
        return this;
    }

    utc(){
        if (!this.utcMode) {
            this.utcMode = true;
        }
        return this;
    }

    local(){
        if (this.utcMode) {
            this.utcMode = false;
        }
        return this;
    }

    useLocale(val, override){
        this.locale = override ? val : !isset(Datetime.locales[val], false) ? "en" : val;
        this.weekStart = Datetime.getLocale(this.locale).weekStart;
        return this;
    }

    clone(){
        const c = datetime(this.value);
        c.locale = this.locale;
        c.weekStart = this.weekStart;
        c.mutable = this.mutable;
        c.utcMode = this.utcMode;
        return c;
    }

    align(to){
        if (this.mutable) {
            this.value = Datetime.align(this, to).val();
            return this;
        }

        return this.clone().immutable(false).align(to).immutable(!this.mutable);
    }

    alignEnd(to){
        if (this.mutable) {
            this.value = Datetime.alignEnd(this, to).val();
            return this;
        }

        return this.clone().immutable(false).alignEnd(to).immutable(!this.mutable);
    }

    val(val){
        if ( typeof val === "undefined" || val === null) {
            return this.value;
        }

        if (this.mutable) {
            this.value = typeof val === "string" ? Date.parse(val) : typeof val === "number" ? new Date(val) : val;
            return this;
        }

        return datetime(val);
    }

    year2(){
        return +((""+this.year()).slice(-2));
    }

    /* Get + Set */

    _set(m, v){
        const fn = "set" + (this.utcMode && m !== "t" ? "UTC" : "") + M[m];
        if (this.mutable) {
            this.value[fn](v);
            return this;
        }
        const clone = this.clone();
        clone.value[fn](v);
        return clone;
    }

    _get(m){
        const fn = "get" + (this.utcMode && m !== "t" ? "UTC" : "") + M[m];
        return this.value[fn]();
    }

    _work(part, val){
        if (!arguments.length || (typeof val === "undefined" || val === null)) {
            return this._get(part);
        }
        return this._set(part, val);
    }

    ms(val){ return this._work("ms", val);}
    second(val){return this._work("s", val);}
    minute(val){return this._work("m", val); }
    hour(val){return this._work("h", val);}
    day(val){return this._work("D", val);}
    month(val){return this._work("M", val);}
    year(val){return this._work("Y", val);}
    time(val){return this._work("t", val);}

    weekDay(val){
        if (!arguments.length || (not(val))) {
            return this.utcMode ? this.value.getUTCDay() : this.value.getDay();
        }

        const curr = this.weekDay();
        const diff = val - curr;

        return this.add(diff, C.D);
    }

    get(unit){
        return typeof this[unit] !== "function" ? this : this[unit]();
    }

    set(unit, val){
        return typeof this[unit] !== "function" ? this : this[unit](val);
    }

    add(val, to){
        switch (to) {
            case C.h:
            case 'h':
            case 'hour':
                return this.time(this.time() + (val * 60 * 60 * 1000));
            case C.m:
            case 'm':
            case 'minute':
                return this.time(this.time() + (val * 60 * 1000));
            case C.s:
            case 's':
            case 'second':
                return this.time(this.time() + (val * 1000));
            case C.ms:
            case 'ms':
                return this.time(this.time() + (val));
            case C.D:
            case 'D':
            case 'day':
                return this.day(this.day() + val);
            case C.W:
            case 'W':
            case 'week':
                return this.day(this.day() + val * 7);
            case C.M:
            case 'M':
            case 'month':
                return this.month(this.month() + val);
            case C.Y:
            case 'Y':
            case 'year':
                return this.year(this.year() + val);
        }
        return this;
    }

    addHour(v){return this.add(v,C.h);}
    addMinute(v){return this.add(v,C.m);}
    addSecond(v){return this.add(v, C.s);}
    addMs(v){return this.add(v, C.ms);}
    addDay(v){return this.add(v,C.D);}
    addWeek(v){return this.add(v,C.W);}
    addMonth(v){return this.add(v, C.M);}
    addYear(v){return this.add(v, C.Y);}

    format(fmt, locale) {
        // Спочатку обробляємо формат через систему форматерів
        const processedFormat = formatterSystem.processFormat(this, fmt, locale);

        // Потім викликаємо оригінальний метод format
        return originalFormat.call(this, processedFormat, locale);
    }

    valueOf(){
        return this.value.valueOf();
    }

    toString(){
        return this.value.toString();
    }
}

alignStrategiesSystem.initializeBuiltInStrategies();

Datetime.alignStrategies = alignStrategiesSystem;
Datetime.formatters = formatterSystem;

const datetime = (...args) => args && args[0] instanceof Datetime ? args[0] : new Datetime(...args)

export {
    Datetime,
    datetime
}