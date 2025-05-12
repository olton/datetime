import {describe, it, expect} from "@olton/latte";
import {Datetime, datetime} from "../src/index.js";
import '../src/plugins/daysin.js';
import '../src/plugins/isleapyear.js';
import locale from '../src/i18n/uk.js';

Datetime.setLocale("ua", locale)

describe('DaysIn plugin test', function() {
    it ('Should be 29', () => {
        expect(datetime("2020-2").daysInMonth()).toBe(29);
    })
    it ('Should be 366', () => {
        expect(datetime("2020-2").daysInYear()).toBe(366);
    })
    it ('Should be 365', () => {
        expect(datetime("2021-2").daysInYear()).toBe(365);
    })
    it ('Should be ', () => {
        expect(datetime("2021-2").daysInYearMap().length).toBe(12);
    })
    it ('Should be ', () => {
        expect(datetime("2021-2").daysInYearObj().February).toBe(28);
    })
    it ('Should be ', () => {
        expect(datetime("2021-2").daysInYearObj('uk', true)['Лют']).toBe(28);
    })
})