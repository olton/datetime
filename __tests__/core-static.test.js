import {describe, it, assert} from "vitest";
import {Datetime, datetime} from "../src";
import ru_locale from  "../src/i18n/ru";

Datetime.setLocale("ru", ru_locale)

describe('Datetime static methods', () => {
    it ('isDatetime() should be true', () => {
        assert.strictEqual(Datetime.isDatetime(datetime()), true);
    });
    it ('now() should be true', () => {
        assert.strictEqual(typeof Datetime.now(false) === "number", true);
    });
    it ('now() should be true', () => {
        assert.strictEqual(Datetime.now(true) instanceof Date, true);
    });
    it ('getLocale() should be true', () => {
        assert.strictEqual(Datetime.getLocale('ru').months[0] === "Январь", true);
    });
    it ('getLocale() should be true', () => {
        assert.strictEqual(Datetime.getLocale('xx').months[0] === "January", true);
    });
    it ('getLocale() should be true', () => {
        assert.strictEqual(Datetime.getLocale().months[0] === "January", true);
    });
    it ('parse() should be true', () => {
        assert.strictEqual(Datetime.parse('Mon, 25 Dec 1995 13:30:00 GMT') instanceof Datetime, true);
    });
    it ('Align to start of year', () => {
        assert.strictEqual(Datetime.align("2020-03-15 09:33:56", "year").format("YYYY-MM-DD HH:mm:ss"), "2020-01-01 00:00:00");
    });
    it ('Align to end of year', () => {
        assert.strictEqual(Datetime.alignEnd("2020-03-15 09:33:56", "year").format("YYYY-MM-DD HH:mm:ss"), "2020-12-31 23:59:59");
    });
});

