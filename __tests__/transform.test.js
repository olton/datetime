import {describe, it} from "@olton/easytest";
import {Datetime, datetime} from "../src";
import '../src/plugins/transform';

describe('Datetime test template', function() {
    it ('Should be', () => {
        assert.strictEqual(datetime("2020-12-22").toDateString(), 'Tue Dec 22 2020');
    })
    it ('Should be', () => {
        assert.strictEqual(datetime("2020-12-22").toISOString(), '2020-12-22T00:00:00.000Z');
    })
    it ('Should be', () => {
        assert.strictEqual(datetime("2020-12-22").toJSON(), '2020-12-22T00:00:00.000Z');
    })
    it ('Should be', () => {
        assert.strictEqual(datetime("2020-12-22").toGMTString(), 'Tue, 22 Dec 2020 00:00:00 GMT');
    })
    it ('Should be', () => {
        assert.strictEqual(datetime("2020-12-22").toLocaleDateString(), '22.12.2020');
    })
    it ('Should be', () => {
        assert.strictEqual(datetime("2020-12-22").toLocaleString(), '22.12.2020, 02:00:00');
    })
    it ('Should be', () => {
        assert.strictEqual(datetime("2020-12-22").toLocaleTimeString(), '02:00:00');
    })
    it ('Should be', () => {
        assert.strictEqual(datetime("2020-12-22").toTimeString().includes('02:00:00 GMT+0200'), true);
    })
    it ('Should be', () => {
        assert.strictEqual(datetime("2020-12-22").toUTCString(), 'Tue, 22 Dec 2020 00:00:00 GMT');
    })
    it ('Should be', () => {
        assert.strictEqual(datetime("2020-12-22").toDate() instanceof Date, true);
    })
})