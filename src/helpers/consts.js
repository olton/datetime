export const DEFAULT_FORMAT = "YYYY-MM-DDTHH:mm:ss.sss";
export const INVALID_DATE = "Invalid date";
export const REGEX_FORMAT = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|m{1,2}|s{1,3}/g;
export const REGEX_FORMAT_STRFTIME = /(%[a-z])/gi;
export const DEFAULT_FORMAT_STRFTIME = "%Y-%m-%dT%H:%M:%S.%Q%t";
export const DEFAULT_LOCALE = {
    months: "January February March April May June July August September October November December".split(" "),
    monthsShort: "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "),
    weekdays: "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),
    weekdaysShort: "Sun Mon Tue Wed Thu Fri Sat".split(" "),
    weekdaysMin: "Su Mo Tu We Th Fr Sa".split(" "),
    weekStart: 0
}

export const M = {
    ms: "Milliseconds",
    s: "Seconds",
    m: "Minutes",
    h: "Hours",
    D: "Date",
    d: "Day",
    M: "Month",
    Y: "FullYear",
    y: "Year",
    t: "Time"
}

export const C = {
    ms: "ms",
    s: "second",
    m: "minute",
    h: "hour",
    D: "day",
    W: "week",
    d: "weekDay",
    M: "month",
    Y: "year",
    Y2: "year2",
    t: "time",
    c: "century",
    q: "quarter"
}