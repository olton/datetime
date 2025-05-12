import {describe, it, expect} from "@olton/latte";
import {Datetime, datetime} from "../src/index.js";
import '../src/plugins/isleapyear.js';

describe('Plugin isLeapYear()', () => {
    it ('Should be true for 2020', () => {
        expect(datetime("2020").isLeapYear()).toBeTrue();
    })
    it ('Should be false for 2021', () => {
        expect(datetime("2021").isLeapYear()).toBeFalse();
    })
});
