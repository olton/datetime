import {describe, it, expect} from "@olton/latte";
import {Datetime, datetime} from "../src/index.js";
import '../src/plugins/transform.js';

describe('Datetime test template', function() {
    it ('Should be', () => {
        expect(datetime("2020-12-22").toDateString()).toBe( 'Tue Dec 22 2020');
    })
    it ('Should be', () => {
        expect(datetime("2020-12-22").toISOString()).toBe( '2020-12-22T00:00:00.000Z');
    })
    it ('Should be', () => {
        expect(datetime("2020-12-22").toJSON()).toBe( '2020-12-22T00:00:00.000Z');
    })
    it ('Should be', () => {
        expect(datetime("2020-12-22").toGMTString()).toBe( 'Tue, 22 Dec 2020 00:00:00 GMT');
    })
    it ('Should be', () => {
        expect(datetime("2020-12-22").toLocaleDateString()).toBe( '22.12.2020');
    })
    it ('Should be', () => {
        expect(datetime("2020-12-22").toLocaleString()).toBe( '22.12.2020, 02:00:00');
    })
    it ('Should be', () => {
        expect(datetime("2020-12-22").toLocaleTimeString()).toBe( '02:00:00');
    })
    it ('Should be', () => {
        expect(datetime("2020-12-22").toTimeString().includes('02:00:00 GMT+0200')).toBe( true);
    })
    it ('Should be', () => {
        expect(datetime("2020-12-22").toUTCString()).toBe( 'Tue, 22 Dec 2020 00:00:00 GMT');
    })
    it ('Should be', () => {
        expect(datetime("2020-12-22").toDate() instanceof Date).toBe( true);
    })
})