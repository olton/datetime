import {describe, it, expect} from "@olton/latte";
import {Datetime, datetime} from "../src/index.js";
import '../src/plugins/quarter.js';

describe('Datetime test template', function() {
    it("default, should be 1", () => {
        expect(datetime("2020-1").month()).toBe( 0);
        expect(datetime("2020-1").add(1, 'quarter').month()).toBe(3);
        expect(datetime("2020-1").add(1, 'day').day()).toBe(2);
    })
    it("default, should be 1", () => {
        expect(datetime("2020-1").month()).toBe( 0);
        expect(datetime("2020-1").addQuarter(1).month()).toBe(3);
    })
    it ('Should be true', () => {
        expect(datetime("2020-2").quarter()).toBe( 1);
        expect(datetime("2020-5").quarter()).toBe( 2);
        expect(datetime("2020-9").quarter()).toBe( 3);
        expect(datetime("2020-11").quarter()).toBe( 4);
    })
    it ('Should be true', () => {
        expect(Datetime.align("2020-5", "quarter").month()).toBe( 3);
    })
    it ('Should be true', () => {
        expect(datetime("2020-5").align("quarter").month()).toBe( 3);
    })
    it ('Should be true', () => {
        expect(Datetime.alignEnd("2020-5", "quarter").month()).toBe( 5);
    })
    it ('Should be true', () => {
        expect(datetime("2020-5").alignEnd("quarter").month()).toBe( 5);
    })
    it ('Should be true', () => {
        expect(datetime("2020-5-12").alignEnd("month").day()).toBe( 31);
    })
})