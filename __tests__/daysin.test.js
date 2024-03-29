import {describe, it, assert} from "vitest";
import {Datetime, datetime} from "../src";
import '../src/plugins/daysin';
import '../src/plugins/isleapyear';
import ru_locale from '../src/i18n/ru';

Datetime.setLocale("ru", ru_locale)

describe('DaysIn plugin test', function() {
    it ('Should be 29', () => {
        assert.strictEqual(datetime("2020-2").daysInMonth(), 29);
    })
    it ('Should be 366', () => {
        assert.strictEqual(datetime("2020-2").daysInYear(), 366);
    })
    it ('Should be 365', () => {
        assert.strictEqual(datetime("2021-2").daysInYear(), 365);
    })
    it ('Should be ', () => {
        assert.strictEqual(datetime("2021-2").daysInYearMap().length, 12);
    })
    it ('Should be ', () => {
        assert.strictEqual(datetime("2021-2").daysInYearObj().February, 28);
    })
    it ('Should be ', () => {
        assert.strictEqual(datetime("2021-2").daysInYearObj('ru', true)['Фев'], 28);
    })
})