import {describe, it, expect} from "@olton/easytest";
import {Datetime, datetime} from "../src/index.js";
import ua_locale from "../src/i18n/ua.js";

Datetime.setLocale("ua", ua_locale)

describe("Core methods", () => {
    it ('The utcMode Should be true', () => {
        expect(datetime().utc().utcMode).toBe( true);
    })

    it ('The utcMode Should be false', () => {
        expect(datetime().local().utcMode).toBe( false);
    })

    it ('The locale Should be ru', () => {
        expect(datetime().useLocale('ru').locale).toBe( 'ru');
    })
    it ('The locale Should be en for xx', () => {
        expect(datetime().useLocale('xx').locale).toBe( 'en');
    })

    it ('The Should be false', () => {
        let date = datetime();
        expect(date === date.clone()).toBe( false);
    })
    it ('The Should be true', () => {
        let date = datetime();
        let clone = date.clone();
        expect(date.locale === clone.locale && date.time() === clone.time()).toBe( true);
    })

    it ('Align to start of year', () => {
        expect(datetime("2020-03-15 09:33:56").align("year").format("YYYY-MM-DD HH:mm:ss")).toBe( "2020-01-01 00:00:00");
    });
    it ('Align to start of month', () => {
        expect(datetime("2020-03-15 09:33:56").align("month").format("YYYY-MM-DD HH:mm:ss")).toBe( "2020-03-01 00:00:00");
    });
    it ('Align to start of day', () => {
        expect(datetime("2020-03-15 09:33:56").align("day").format("YYYY-MM-DD HH:mm:ss")).toBe( "2020-03-15 00:00:00");
    });
    it ('Align to start of hour', () => {
        expect(datetime("2020-03-15 09:33:56").align("hour").format("YYYY-MM-DD HH:mm:ss")).toBe( "2020-03-15 09:00:00");
    });
    it ('Align to start of minute', () => {
        expect(datetime("2020-03-15 09:33:56").align("minute").format("YYYY-MM-DD HH:mm:ss")).toBe( "2020-03-15 09:33:00");
    });
    it ('Align to start of second', () => {
        expect(datetime("2020-03-15 09:33:56").align("second").format("YYYY-MM-DD HH:mm:ss.sss")).toBe( "2020-03-15 09:33:56.000");
    });
    it ('Align to start of week', () => {
        expect(datetime("2020-03-14 09:33:56").align("week").format("YYYY-MM-DD HH:mm:ss.sss")).toBe( "2020-03-08 00:00:00.000");
    });
    it ('Align to start of year', () => {
        expect(datetime("2020-03-15 09:33:56").immutable().align("year").format("YYYY-MM-DD HH:mm:ss")).toBe( "2020-01-01 00:00:00");
    });

    it ('Align to end of year', () => {
        expect(datetime("2020-03-15 09:33:56").alignEnd("year").format("YYYY-MM-DD HH:mm:ss")).toBe( "2020-12-31 23:59:59");
    });
    it ('Align to end of month', () => {
        expect(datetime("2020-03-15 09:33:56").alignEnd("month").format("YYYY-MM-DD HH:mm:ss")).toBe( "2020-03-31 23:59:59");
    });
    it ('Align to end of day', () => {
        expect(datetime("2020-03-15 09:33:56").alignEnd("day").format("YYYY-MM-DD HH:mm:ss")).toBe( "2020-03-15 23:59:59");
    });
    it ('Align to end of hour', () => {
        expect(datetime("2020-03-15 09:33:56").alignEnd("hour").format("YYYY-MM-DD HH:mm:ss")).toBe( "2020-03-15 09:59:59");
    });
    it ('Align to end of minute', () => {
        expect(datetime("2020-03-15 09:33:56").alignEnd("minute").format("YYYY-MM-DD HH:mm:ss")).toBe( "2020-03-15 09:33:59");
    });
    it ('Align to end of second', () => {
        expect(datetime("2020-03-15 09:33:56.777").alignEnd("minute").format("YYYY-MM-DD HH:mm:ss.sss")).toBe( "2020-03-15 09:33:59.999");
    });
    it ('Align to end of week', () => {
        expect(datetime("2020-03-15 09:33:56").alignEnd("week").format("YYYY-MM-DD HH:mm:ss")).toBe( "2020-03-21 23:59:59");
    });
    it ('Align to unknown', () => {
        expect(datetime("2020-03-15 09:33:56").alignEnd("xxx").format("YYYY-MM-DD HH:mm:ss")).toBe( "2020-03-15 09:33:56");
    });
    it ('Align to end of year', () => {
        expect(datetime("2020-03-15 09:33:56").immutable().alignEnd("year").format("YYYY-MM-DD HH:mm:ss")).toBe( "2020-12-31 23:59:59");
    });

    it ('Should be 21 for 2021', () => {
        expect(datetime("2021").year2()).toBe( 21);
    })

    it ('Should be true for datetime(2020).val().getTime() === new Date(2020).getTime()', () => {
        expect(datetime("2020").val().getTime() === new Date("2020").getTime()).toBe( true);
    })
    it ('Should be true for datetime().val(new Date("2021")).val().getTime() === new Date(2021).getTime()', () => {
        expect(datetime().val(new Date("2021")).val().getTime() === new Date("2021").getTime()).toBe( true);
    })
    it ('Should be true', () => {
        expect(datetime().val(new Date("2021"))  instanceof Datetime).toBe( true);
    })
    it ('Should be true', () => {
        expect(datetime().immutable().val(new Date("2021"))  instanceof Datetime).toBe( true);
    })

    it ('Should be 21 for 2021', () => {
        expect(datetime("2021").get('year')).toBe( 2021);
    })
    it ('Should be 2 for 2021-03', () => {
        expect(datetime("2021-03").get('month')).toBe( 2);
    })
    it ('Should be 15 for 2021-03-15', () => {
        expect(datetime("2021-03-15").get('day')).toBe( 15);
    })
    it ('Should be 1 for 2021-03-15', () => {
        expect(datetime("2021-03-15").get('weekDay')).toBe( 1);
    })
    it ('Should be 13', () => {
        expect(datetime("2021-03-15 13:15:34").get('hour')).toBe( 13);
    })
    it ('Should be 15 for 2021-03-15', () => {
        expect(datetime("2021-03-15 13:15:34").get('minute')).toBe( 15);
    })
    it ('Should be 15 for 2021-03-15', () => {
        expect(datetime("2021-03-15 13:15:34").get('second')).toBe( 34);
    })
    it ('Should be 15 for 2021-03-15', () => {
        expect(datetime("2021-03-15 13:15:34.243").get('ms')).toBe( 243);
    })
    it ('Should be 15 for 2021-03-15', () => {
        expect(datetime("2021-03-15 13:15:34.243").get('time')).toBe( 1615806934243);
    })
    it ('Should be 21 for 2021', () => {
        expect(datetime("2021").utc().get('year')).toBe( 2021);
    })
    it ('Should be 2 for 2021-03', () => {
        expect(datetime("2021-03").utc().get('month')).toBe( 2);
    })
    it ('Should be 15 for 2021-03-15', () => {
        expect(datetime("2021-03-15").utc().get('day')).toBe( 15);
    })
    it ('Should be 1 for 2021-03-15', () => {
        expect(datetime("2021-03-15").utc().get('weekDay')).toBe( 1);
    })
    it ('Should be 13', () => {
        expect(datetime("2021-03-15 13:15:34").utc().get('hour')).toBe( 11);
    })
    it ('Should be 15 for 2021-03-15', () => {
        expect(datetime("2021-03-15 13:15:34").utc().get('minute')).toBe( 15);
    })
    it ('Should be 15 for 2021-03-15', () => {
        expect(datetime("2021-03-15 13:15:34").utc().get('second')).toBe( 34);
    })
    it ('Should be 15 for 2021-03-15', () => {
        expect(datetime("2021-03-15 13:15:34.243").utc().get('ms')).toBe( 243);
    })
    it ('Should be 15 for 2021-03-15', () => {
        expect(datetime("2021-03-15 13:15:34.243").utc().get('time')).toBe( 1615806934243);
    })
    it ('Should be 15 for 2021-03-15', () => {
        expect(datetime("2021-03-15 13:15:34.243").immutable().get('time')).toBe( 1615806934243);
    })
    it ('Should be 15 for 2021-03-15', () => {
        expect(datetime("2021-03-15 13:15:34.243").get('xxx') instanceof Datetime).toBe( true);
    })

    it ('Should be 15 for 2021-03-15', () => {
        expect(datetime("2021-03-15 13:15:34.243").ms()).toBe( 243);
    })
    it ('Should be 15 for 2021-03-15', () => {
        expect(datetime("2021-03-15 13:15:34.243").second()).toBe( 34);
    })
    it ('Should be 15 for 2021-03-15', () => {
        expect(datetime("2021-03-15 13:15:34.243").minute()).toBe( 15);
    })
    it ('Should be 15 for 2021-03-15', () => {
        expect(datetime("2021-03-15 13:15:34.243").hour()).toBe( 13);
    })
    it ('Should be 15 for 2021-03-15', () => {
        expect(datetime("2021-03-15 13:15:34.243").day()).toBe( 15);
    })
    it ('Should be 15 for 2021-03-15', () => {
        expect(datetime("2021-03-15 13:15:34.243").weekDay()).toBe( 1);
    })
    it ('Should be 15 for 2021-03-15', () => {
        expect(datetime("2021-03-15 13:15:34.243").weekDay(null)).toBe( 1);
    })
    it ('Should be 15 for 2021-03-15', () => {
        expect(datetime("2021-03-15 13:15:34.243").month()).toBe( 2);
    })
    it ('Should be 15 for 2021-03-15', () => {
        expect(datetime("2021-03-15 13:15:34.243").year()).toBe( 2021);
    })

    it ('Should be 22', () => {
        expect(datetime("2021").set('year', 2022).year()).toBe( 2022);
    })
    it ('Should be 3', () => {
        expect(datetime("2021-03").set('month', 3).month()).toBe( 3);
    })
    it ('Should be 22', () => {
        expect(datetime("2021-03-15").set('day', 22).day()).toBe( 22);
    })
    it ('Should be 1 for 2021-03-15', () => {
        expect(datetime("2021-03-15").set('weekDay', 2).weekDay()).toBe( 2);
    })
    it ('Should be 10', () => {
        expect(datetime("2021-03-15 13:15:34").set('hour', 10).hour()).toBe( 10);
    })
    it ('Should be 10', () => {
        expect(datetime("2021-03-15 13:15:34").set('minute', 10).minute()).toBe( 10);
    })
    it ('Should be 10', () => {
        expect(datetime("2021-03-15 13:15:34").set('second', 10).second()).toBe( 10);
    })
    it ('Should be 222', () => {
        expect(datetime("2021-03-15 13:15:34.243").set('ms', 222).ms()).toBe( 222);
    })
    it ('Should be 1615806934244', () => {
        expect(datetime("2021-03-15 13:15:34.243").set('time', 1615806934244).time()).toBe( 1615806934244);
    })
    it ('Should be 2022', () => {
        expect(datetime("2021").utc().set('year', 2022).year()).toBe( 2022);
    })
    it ('Should be 3', () => {
        expect(datetime("2021-03").utc().set('month', 3).month()).toBe( 3);
    })
    it ('Should be 10', () => {
        expect(datetime("2021-03-15").utc().set('day', 10).day()).toBe( 10);
    })
    it ('Should be 1 for 2021-03-15', () => {
        expect(datetime("2021-03-15").utc().set('weekDay', 2).weekDay()).toBe( 2);
    })
    it ('Should be 11', () => {
        expect(datetime("2021-03-15 13:15:34").utc().set('hour', 11).hour()).toBe( 11);
    })
    it ('Should be 20', () => {
        expect(datetime("2021-03-15 13:15:34").utc().set('minute', 20).minute()).toBe( 20);
    })
    it ('Should be 15', () => {
        expect(datetime("2021-03-15 13:15:34").utc().set('second', 15).second()).toBe( 15);
    })
    it ('Should be 222', () => {
        expect(datetime("2021-03-15 13:15:34.243").utc().set('ms', 222).ms()).toBe( 222);
    })
    it ('Should be 1615806934244', () => {
        expect(datetime("2021-03-15 13:15:34.243").utc().set('time', 1615806934244).time()).toBe( 1615806934244);
    })
    it ('Should be 1615806934244', () => {
        expect(datetime("2021-03-15 13:15:34.243").immutable().set('time', 1615806934244).time()).toBe( 1615806934244);
    })
    it ('Should be 1615806934243', () => {
        expect(datetime("2021-03-15 13:15:34.243").immutable().set('zzz', 1615806934244).time()).toBe( 1615806934243);
    })

    it("default, should be 2021", () => {
        expect(datetime("2020").year()).toBe( 2020);
        expect(datetime("2020").add(1, 'year').year()).toBe( 2021);
    })
    it("default, should be 1", () => {
        expect(datetime("2020").month()).toBe( 0);
        expect(datetime("2020").add(1, 'month').month()).toBe( 1);
    })
    it("default, should be 2", () => {
        expect(datetime("2020").day()).toBe( 1);
        expect(datetime("2020").add(1, 'day').day()).toBe( 2);
    })
    it("default, should be 1", () => {
        expect(datetime("2020-1").hour()).toBe( 0);
        expect(datetime("2020-1").add(1, 'hour').hour()).toBe( 1);
    })
    it("default, should be 1", () => {
        expect(datetime("2020-1").minute()).toBe( 0);
        expect(datetime("2020-1").add(1, 'minute').minute()).toBe( 1);
    })
    it("default, should be 1", () => {
        expect(datetime("2020-1").second()).toBe( 0);
        expect(datetime("2020-1").add(1, 'second').second()).toBe( 1);
    })
    it("default, should be 1", () => {
        expect(datetime("2020-1").ms()).toBe( 0);
        expect(datetime("2020-1").add(1, 'ms').ms()).toBe( 1);
    })
    it("default, should be 1", () => {
        expect(datetime("2020-1").day()).toBe( 1);
        expect(datetime("2020-1").add(1, 'week').day()).toBe( 8);
    })

    it("default, should be 2021", () => {
        expect(datetime("2020").year()).toBe( 2020);
        expect(datetime("2020").addYear(1).year()).toBe( 2021);
    })
    it("default, should be 1", () => {
        expect(datetime("2020").month(), 0);
        expect(datetime("2020").addMonth(1).month()).toBe( 1);
    })
    it("default, should be 2", () => {
        expect(datetime("2020").day()).toBe( 1);
        expect(datetime("2020").addDay(1).day()).toBe( 2);
    })
    it("default, should be 1", () => {
        expect(datetime("2020-1").hour(), 0);
        expect(datetime("2020-1").addHour(1).hour()).toBe( 1);
    })
    it("default, should be 1", () => {
        expect(datetime("2020-1").minute()).toBe( 0);
        expect(datetime("2020-1").addMinute(1).minute()).toBe( 1);
    })
    it("default, should be 1", () => {
        expect(datetime("2020-1").second()).toBe( 0);
        expect(datetime("2020-1").addSecond(1).second()).toBe( 1);
    })
    it("default, should be 1", () => {
        expect(datetime("2020-1").ms()).toBe( 0);
        expect(datetime("2020-1").addMs(1).ms()).toBe( 1);
    })
    it("default, should be 1", () => {
        expect(datetime("2020-1").day()).toBe( 1);
        expect(datetime("2020-1").addWeek(1).day()).toBe( 8);
    })

    it("default, should be ", () => {
        expect(datetime("2020").format()).toBe( '2020-01-01T02:00:00.000');
    })

    it("", () => {
        expect(datetime("2020").toString().includes("Wed Jan 01 2020")).toBe( true);
    })

    it("", () => {
        expect(datetime("2020").valueOf()).toBe( 1577836800000);
    })
})

