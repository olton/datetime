import {describe, it, expect} from "@olton/latte";
import {Datetime, datetime} from "../src/index.js";
import '../src/plugins/today.js';

describe('Datetime plugin today', function() {
    describe('isToday()', () => {
        it ('Should be true', () => {
            expect(Datetime.isToday(new Date())).toBe( true);
        })
        it ('Should be true for 2020-12-21 and 2020-12-21', () => {
            var today = new Date();
            expect(datetime(today).isToday()).toBe( true);
        })
        it ('Should be false for 2020-12-21 and 2020-12-22', () => {
            expect(datetime("1972-12-21").isToday("2020-12-22")).toBe( false);
        })
        it ('Should be false', () => {
            expect(datetime().today().time() === datetime().addDay(1).time()).toBe( false);
        })
        it ('Should be true', () => {
            let date = datetime().add(1, 'day');
            expect(date.today().time() === new Date().getTime()).toBe( true);
        })
        it ('Should be true', () => {
            let date = datetime().add(1, 'day');
            expect(date.immutable().today().time() === new Date().getTime()).toBe( true);
        })
    });
})