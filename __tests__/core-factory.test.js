import {describe, it, expect} from "@olton/easytest";
import {Datetime, datetime} from "../src/index.js";
import ua_locale from "../src/i18n/ua.js";
import {INVALID_DATE} from "../src/helpers/consts";

Datetime.setLocale("ua", ua_locale)

describe('Factory datetime()', () => {
    it ('should return a instance of Datetime ', () => {
        expect(datetime() instanceof Datetime).toBe( true);
    });
    it ('should return a instance of Datetime for Datetime', () => {
        expect(datetime(datetime()) instanceof Datetime).toBe( true);
    });
    it ('should return a instance of Datetime for null', () => {
        expect(datetime(null) instanceof Datetime).toBe( true);
    });
    it ('should return a instance fo Datetime for 2020-12-21', () => {
        expect(datetime('2020-12-21') instanceof Datetime).toBe( true);
    });
    it ('should return a instance fo Datetime for 2020-12-21 00:00:00', () => {
        expect(datetime('2020-12-21 00:00:00') instanceof Datetime).toBe( true);
    });
    it ('should return a instance fo Datetime for 2020-12', () => {
        expect(datetime("2020-12") instanceof Datetime, true);
    });
    it ('should return a instance fo Datetime for 2020', () => {
        expect(datetime(2020) instanceof Datetime).toBe( true);
    });
    it ('should return a instance fo Datetime for 2020, 12, 21', () => {
        expect(datetime(2020, 12, 21) instanceof Datetime).toBe( true);
    });
    it ('should return a instance fo Datetime for [2020, 12, 21]', () => {
        expect(datetime([2020, 12, 21]) instanceof Datetime).toBe( true);
    });
    it ('should throw error for 21-12-1972', () => {
        expect(() => {datetime("21-12-1972")}).toThrow();
    });
    it ('should throw error for ***', () => {
        expect(() => {datetime("***")}).toThrow();
    });
    it ('should throw error for undefined', () => {
        expect(() => {datetime(undefined)}).toThrow();
    });
});
