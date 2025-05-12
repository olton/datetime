import {describe, it, expect} from "@olton/latte";
import {Datetime, datetime} from "../src/index.js";
import ua_locale from "../src/i18n/uk.js";

Datetime.setLocale("uk", ua_locale)

describe('Datetime static methods', () => {
    it ('isDatetime() should be true', () => {
        expect(Datetime.isDatetime(datetime())).toBeTrue();
    });
    it ('now() should be true', () => {
        expect(Datetime.now(false)).toBeNumber();
    });
    it ('now() should be true', () => {
        expect(Datetime.now(true)).toBeInstanceOf(Date);
    });
    it ('getLocale() should be true', () => {
        expect(Datetime.getLocale('uk').months[0]).toBe("Січень");
    });
    it ('getLocale() should be true', () => {
        expect(Datetime.getLocale('xx').months[0]).toBe("January");
    });
    it ('getLocale() should be true', () => {
        expect(Datetime.getLocale().months[0]).toBe("January");
    });
    it ('parse() should be true', () => {
        expect(Datetime.parse('Mon, 25 Dec 1995 13:30:00 GMT')).toBeInstanceOf(Datetime);
    });
    it ('Align to start of year', () => {
        expect(Datetime.align("2020-03-15 09:33:56", "year").format("YYYY-MM-DD HH:mm:ss")).toBe("2020-01-01 00:00:00");
    });
    it ('Align to end of year', () => {
        expect(Datetime.alignEnd("2020-03-15 09:33:56", "year").format("YYYY-MM-DD HH:mm:ss")).toBe("2020-12-31 23:59:59");
    });
});

