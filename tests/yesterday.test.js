import {describe, it, expect} from "@olton/latte";
import {Datetime, datetime} from "../src/index.js";
import '../src/plugins/yesterday.js';

describe('Datetime', function() {
    it ('Should be true', () => {
        expect(Datetime.isYesterday("1972-12-21")).toBe( false);
    })
    it ('Should be true', () => {
        var yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        expect(datetime(yesterday).isYesterday()).toBe( true);
    })
    it ('Should be false', () => {
        expect(datetime("1972-12-21").isYesterday()).toBe( false);
    })
    it ('Should be false', () => {
        expect(datetime("1972-12-21").yesterday().day()).toBe( 20);
        expect(datetime("1972-12-21").immutable().yesterday().day()).toBe( 20);
    })
})