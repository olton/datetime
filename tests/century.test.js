import {describe, it, expect} from "@olton/latte";
import {Datetime, datetime} from "../src/index.js"
import "../src/plugins/century.js";

describe('century()', () => {
    it ('Should be 20 for 2021', () => {
        expect(datetime("2021").century()).toBe( 21);
    })
    it ('Should be 20 for 2000', () => {
        expect(datetime("2000").century()).toBe( 20);
    })
    it ('Should be 19 for 1972', () => {
        expect(datetime("1972").format('C')).toBe( '20');
    })
});
