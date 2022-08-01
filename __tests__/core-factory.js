import assert from 'assert';
import chai from 'chai';
import {Datetime, datetime} from "../src/index.js";
import ru_locale from "../src/i18n/ru";
import {INVALID_DATE} from "../src/helpers/consts";

let expect = chai.expect;
Datetime.setLocale("ru", ru_locale)

describe('Factory datetime()', () => {
    it ('should return a instance of Datetime ', () => {
        assert.strictEqual(datetime() instanceof Datetime, true);
    });
    it ('should return a instance of Datetime for Datetime', () => {
        assert.strictEqual(datetime(datetime()) instanceof Datetime, true);
    });
    it ('should return a instance of Datetime for null', () => {
        assert.strictEqual(datetime(null) instanceof Datetime, true);
    });
    it ('should return a instance fo Datetime for 2020-12-21', () => {
        assert.strictEqual(datetime('2020-12-21') instanceof Datetime, true);
    });
    it ('should return a instance fo Datetime for 2020-12-21 00:00:00', () => {
        assert.strictEqual(datetime('2020-12-21 00:00:00') instanceof Datetime, true);
    });
    it ('should return a instance fo Datetime for 2020-12', () => {
        assert.strictEqual(datetime("2020-12") instanceof Datetime, true);
    });
    it ('should return a instance fo Datetime for 2020', () => {
        assert.strictEqual(datetime(2020) instanceof Datetime, true);
    });
    it ('should return a instance fo Datetime for 2020, 12, 21', () => {
        assert.strictEqual(datetime(2020, 12, 21) instanceof Datetime, true);
    });
    it ('should return a instance fo Datetime for [2020, 12, 21]', () => {
        assert.strictEqual(datetime([2020, 12, 21]) instanceof Datetime, true);
    });
    it ('should throw error for 21-12-1972', () => {
        expect(() => {datetime("21-12-1972")}).to.throw(INVALID_DATE);
    });
    it ('should throw error for ***', () => {
        expect(() => {datetime("***")}).to.throw(INVALID_DATE);
    });
    it ('should throw error for undefined', () => {
        expect(() => {datetime(undefined)}).to.throw(INVALID_DATE);
    });
});
