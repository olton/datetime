import {describe, it, expect} from "@olton/latte";
import {Datetime, datetime} from "../src/index.js";
import '../src/plugins/isleapyear.js';
import '../src/plugins/dayofyear.js';

describe('dayOfYear()', () => {
    it ('Should be 356 for 2020-12-21', () => {
        expect(datetime("2020-12-21").dayOfYear()).toBe(356);
    })
    it ('Should be 356 for 2020-12-21', () => {
        expect(datetime("2021-12-21").dayOfYear()).toBe(355);
    })
});
