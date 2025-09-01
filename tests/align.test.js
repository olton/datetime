import {describe, it, expect} from "@olton/latte";
import {Datetime, datetime} from "../src/index.js";
import "../src/plugins/iso.js";
import "../src/plugins/quarter.js";

describe('Align Strategies System', () => {
    it("Align minute", () => {
        const dt = datetime().align("minute")
        expect(dt.second()).toBe(0)
    })
    it("AlignEnd minute", () => {
        const dt = datetime().alignEnd("minute")
        expect(dt.second()).toBe(59)
    })
    
    it("Align hours", () => {
        const dt = datetime().align("hour")
        expect(dt.minute()).toBe(0)
    })
    it("AlignEnd hours", () => {
        const dt = datetime().alignEnd("hour")
        expect(dt.minute()).toBe(59)
    })
    
    it("Align day", () => {
        const dt = datetime().align("day")
        expect(dt.format("HH:mm:ss")).toBe("00:00:00")
    })
    it("AlignEnd day", () => {
        const dt = datetime().alignEnd("day")
        expect(dt.format("HH:mm:ss")).toBe("23:59:59")
    })
    
    it("Align month", () => {
        const dt = datetime().align("month")
        expect(dt.format("DD")).toBe("01")
    })
    it("AlignEnd month", () => {
        const dt = datetime().alignEnd("month")
        const nd = datetime().addMonth(1).align("month").addDay(-1)
        expect(dt.format("DD")).toBe(nd.format("DD"))
    })
    
    it("Align year", () => {
        const dt = datetime().align("year")
        expect(dt.format("MM")).toBe("01")
    })
    it("AlignEnd year", () => {
        const dt = datetime().alignEnd("year")
        expect(dt.format("MM")).toBe("12")
    })
    
    it('Should use ISO week alignment strategy', () => {
        const dt = datetime("2020-12-22"); // Вівторок
        const aligned = Datetime.align(dt, "isoWeek");
        expect(aligned.format()).toBe('2020-12-21T00:00:00.000'); // Понеділок
    });

    it('Should use ISO week alignEnd strategy', () => {
        const dt = datetime("2020-12-22"); // Вівторок
        const alignedEnd = Datetime.alignEnd(dt, "isoWeek");
        expect(alignedEnd.format()).toBe('2020-12-27T23:59:59.999'); // Неділя
    });

    it('Should use quarter alignment strategy', () => {
        const dt = datetime("2020-05-15"); // Травень (2-й квартал)
        const aligned = Datetime.align(dt, "quarter");
        expect(aligned.format()).toBe('2020-04-01T00:00:00.000'); // Початок 2-го кварталу
    });

    it('Should use quarter alignEnd strategy', () => {
        const dt = datetime("2020-05-15"); // Травень (2-й квартал)
        const alignedEnd = Datetime.alignEnd(dt, "quarter");
        expect(alignedEnd.format()).toBe('2020-06-30T23:59:59.999'); // Кінець 2-го кварталу
    });

    it('Should allow dynamic strategy registration', () => {
        // Реєстрація кастомної стратегії
        Datetime.alignStrategies.registerAlignStrategy('testStrategy', (date) => {
            return date.hour(12);
        });

        const dt = datetime("2023-01-01 09:30:00");
        const aligned = Datetime.align(dt, "testStrategy");
        expect(aligned.hour()).toBe(12);

        // Очистка кастомної стратегії
        Datetime.alignStrategies.unregisterAlignStrategy('testStrategy');
    });

    it('Should fallback to default behavior for unknown strategies', () => {
        const dt = datetime("2023-01-01 09:30:00");
        const aligned = Datetime.align(dt, "unknownStrategy");
        expect(aligned.format()).toBe(dt.format()); // Повинен повернути оригінальну дату
    });
});