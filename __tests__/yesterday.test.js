import {describe, it} from "@olton/easytest";
import {Datetime, datetime} from "../src/index.js";
import '../src/plugins/yesterday.js';

describe('Datetime', function() {
    it ('Should be true', () => {
        assert.strictEqual(Datetime.isYesterday("1972-12-21"), false);
    })
    it ('Should be true', () => {
        var yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        assert.strictEqual(datetime(yesterday).isYesterday(), true);
    })
    it ('Should be false', () => {
        assert.strictEqual(datetime("1972-12-21").isYesterday(), false);
    })
    it ('Should be false', () => {
        assert.strictEqual(datetime("1972-12-21").yesterday().day(), 20);
        assert.strictEqual(datetime("1972-12-21").immutable().yesterday().day(), 20);
    })
})