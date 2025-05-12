import {describe, it, expect} from "@olton/latte";
import {Datetime, datetime} from "../src/index.js";
import '../src/plugins/transform.js';
import '../src/plugins/timezone.js';

describe('Datetime test template', function() {
    it ('Should be true', () => {
        expect(datetime("2020-1").utcOffset()).toBe( -120);
    })
    it ('Should be true', () => {
        expect(datetime("2020-1").timezone()).toBe( '+02:00');
    })
    // it ('Should be true', () => {
    //     expect(datetime("2020-1").timezoneName(), 'GMT+02:00');
    // })
    it ('Should be true', () => {
        expect(datetime("2020-1").format("Z ZZ")).toBe( '+02:00 +0200');
        expect(datetime("2020-1").utc().format("Z ZZ")).toBe( 'Z +0200');
        expect(datetime("2020-1").format()).toBe( '2020-01-01T00:00:00.000');
    })
})