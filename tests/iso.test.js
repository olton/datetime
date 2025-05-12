import {describe, it, expect} from "@olton/latte";
import {Datetime, datetime} from "../src/index.js";
import '../src/plugins/iso.js';

describe('Datetime test template', function() {
    it ('Should be true', () => {
        expect(datetime("2020-12-20").isoWeekDay()).toBe( 7);
    })
    it ('Should be true', () => {
        expect(datetime("2020-12-20").isoWeekDay(5).day()).toBe( 18);
    })
    it ('Should be true', () => {
        expect(datetime("2020-12-22").isoWeekDay()).toBe( 2);
        expect(datetime("2020-12-22").isoWeekDay(5).day()).toBe( 25);
    })
    it ('Should be true', () => {
        expect(datetime("2020-12-22").format()).toBe('2020-12-22T02:00:00.000');
        expect(datetime("2020-12-22").format("YYYY I")).toBe('2020 2');
    })
    it ('Should be true', () => {
        expect(Datetime.align("2020-12-22", "isoWeek").format()).toBe('2020-12-21T00:00:00.000');
    })
    it ('Should be true', () => {
        expect(Datetime.alignEnd("2020-12-22", "isoWeek").format()).toBe('2020-12-27T23:59:59.999');
    })
})