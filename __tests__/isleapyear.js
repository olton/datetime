import assert from 'assert';
import {Datetime, datetime} from "../src";
import '../src/plugins/isleapyear';

describe('Plugin isLeapYear()', () => {
    it ('Should be true for 2020', () => {
        assert.strictEqual(datetime("2020").isLeapYear(), true);
    })
    it ('Should be false for 2021', () => {
        assert.strictEqual(datetime("2021").isLeapYear(), false);
    })
});
