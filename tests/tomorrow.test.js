import {describe, it, expect} from "@olton/latte";
import {Datetime, datetime} from "../src/index.js";
import '../src/plugins/tomorrow.js';

describe('isTomorrow()', () => {
    it ('Should be true', () => {
        expect(Datetime.isTomorrow("1972-12-21")).toBe( false);
    })
    it ('Should be true', () => {
        var tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        expect(datetime(tomorrow).isTomorrow()).toBe( true);
    })
    it ('Should be false', () => {
        expect(datetime("1972-12-21").isTomorrow()).toBe( false);
    })
    it ('Should be 22', () => {
        expect(datetime("1972-12-21").tomorrow().day()).toBe( 22);
    })
    it ('Should be 22', () => {
        expect(datetime("1972-12-21").immutable().tomorrow().day()).toBe( 22);
    })
});
