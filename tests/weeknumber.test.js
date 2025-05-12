import {describe, it, expect} from "@olton/latte";
import {Datetime, datetime} from "../src/index.js";
import '../src/plugins/transform.js';
import '../src/plugins/timezone.js';
import '../src/plugins/weeknumber.js';

describe('Datetime test template', function() {
    it ('Should be true', () => {
        expect(datetime("1972-12-21").weekNumber()).toBe(51);
    })
    it ('Should be true', () => {
        expect(datetime("2020-12-21").weekNumber(1)).toBe(52);
    })
    it ('Should be true', () => {
        expect(datetime("2020-12-28").weekNumber(1)).toBe(53);
    })
    it ('Should be true', () => {
        expect(datetime("2020-12-28").isoWeekNumber()).toBe(53);
    })
    it ('Should be true', () => {
        expect(datetime("2020-12-28").weeksInYear()).toBe(53);
    })
    it ('Should be true', () => {
        expect(datetime("2020-1-28").format("W WW WWW WWWW")).toBe('5 05 5 05');
    })
    it ('Should be true', () => {
        expect(datetime("2020-12-28").format("W WW WWW WWWW")).toBe('53 53 53 53');
    })
    it ('Should be true', () => {
        expect(datetime("2020-12-28").format()).toBe('2020-12-28T02:00:00.000');
    })
})