import {Datetime, datetime} from "../core/class";

const createCalendar = (date, iso) => {
    let _date = datetime(date);
    let ws = iso === 0 || iso ? iso : date.weekStart;
    let wd = ws ? _date.isoWeekDay() : _date.weekDay();
    let names = Datetime.getLocale(_date.locale);
    let now = datetime(), i;

    const getWeekDays = (wd, ws) => {
        if (ws === 0) {
            return wd;
        }
        let su = wd[0];
        return wd.slice(1).concat([su]);
    }

    const result = {
        month: names.months[_date.month()],
        days: [],
        weekstart: iso ? 1 : 0,
        weekdays: getWeekDays(names.weekdaysMin,ws),
        today: now.format("YYYY-MM-DD"),
        weekends: [],
        week: []
    };


    _date.addDay(ws ? -wd+1 : -wd);

    for(i = 0; i < 42; i++) {
        result.days.push(_date.format("YYYY-MM-DD"));
        _date.add(1, 'day');
    }

    result.weekends = result.days.filter(function(v, i){
        const def = [0,6,7,13,14,20,21,27,28,34,35,41];
        const iso = [5,6,12,13,19,20,26,27,33,34,40,41];

        return ws === 0 ? def.includes(i) : iso.includes(i);
    });

    _date = now.clone();
    wd = ws ? _date.isoWeekDay() : _date.weekDay();
    _date.addDay(ws ? -wd+1 : -wd);
    for (i = 0; i < 7; i++) {
        result.week.push(_date.format("YYYY-MM-DD"));
        _date.add(1, 'day');
    }

    return result;
}

Object.assign(Datetime.prototype, {
    // 1 - Monday, 0 - Sunday
    calendar(weekStart){
        return createCalendar(this, weekStart);
    }
});

