import { describe, it, expect } from "@olton/latte";
import { datetime } from "../src/index.js";

describe("Datetime strftime Method", () => {
    it("should format date with year specifier %Y", () => {
        const dt = datetime("2023-05-15");
        expect(dt.strftime("%Y")).toBe("2023");
    });

    it("should format date with month specifier %m", () => {
        const dt = datetime("2023-05-15");
        expect(dt.strftime("%m")).toBe("05");
    });

    it("should format date with day specifier %d", () => {
        const dt = datetime("2023-05-15");
        expect(dt.strftime("%d")).toBe("15");
    });

    it("should format date with hour specifier %H", () => {
        const dt = datetime("2023-05-15T14:30:45");
        expect(dt.strftime("%H")).toBe("14");
    });

    it("should format date with minute specifier %M", () => {
        const dt = datetime("2023-05-15T14:30:45");
        expect(dt.strftime("%M")).toBe("30");
    });

    it("should format date with second specifier %S", () => {
        const dt = datetime("2023-05-15T14:30:45");
        expect(dt.strftime("%S")).toBe("45");
    });

    it("should format date with multiple specifiers", () => {
        const dt = datetime("2023-05-15T14:30:45");
        expect(dt.strftime("%Y-%m-%d %H:%M:%S")).toBe("2023-05-15 14:30:45");
    });

    it("should format date with month name specifier %B", () => {
        const dt = datetime("2023-05-15");
        expect(dt.strftime("%B")).toBe("May");
    });

    it("should format date with abbreviated month name specifier %b", () => {
        const dt = datetime("2023-05-15");
        expect(dt.strftime("%b")).toBe("May");
    });

    it("should format date with weekday name specifier %A", () => {
        const dt = datetime("2023-05-15"); // May 15, 2023 is a Monday
        expect(dt.strftime("%A")).toBe("Monday");
    });

    it("should format date with abbreviated weekday name specifier %a", () => {
        const dt = datetime("2023-05-15"); // May 15, 2023 is a Monday
        expect(dt.strftime("%a")).toBe("Mon");
    });

    it("should format date with century specifier %C", () => {
        const dt = datetime("2023-05-15");
        expect(dt.strftime("%C")).toBe("21");
    });

    it("should format date with day of year specifier %j", () => {
        const dt = datetime("2023-01-15"); // January 15 is the 15th day of the year
        expect(dt.strftime("%j")).toBe("015");
    });

    it("should format date with AM/PM specifier %p", () => {
        const morning = datetime("2023-05-15T09:30:00");
        const afternoon = datetime("2023-05-15T14:30:00");
        
        expect(morning.strftime("%p")).toBe("AM");
        expect(afternoon.strftime("%p")).toBe("PM");
    });

    it("should format date with time specifier %T", () => {
        const dt = datetime("2023-05-15T14:30:45");
        expect(dt.strftime("%T")).toBe("14:30:45");
    });

    it("should format date with milliseconds specifier %Q", () => {
        const dt = datetime("2023-05-15T14:30:45.123");
        expect(dt.strftime("%Q")).toBe("123");
    });
});