import {describe, it, assert} from "@olton/easytest";
import {Datetime, datetime} from "../src";
import {lpad} from "../src/helpers/lpad";
import {not} from "../src/helpers/not";

describe('Datetime Utils', function() {
    it ('Should be 009', () => {
        assert.strictEqual(lpad(9, "0", 3), '009');
    })
    it ('Should be 009', () => {
        assert.strictEqual(lpad(9, 0, 3), '009');
    })
    it ('Should be 19', () => {
        assert.strictEqual(lpad(19, "0", 2), '19');
    })
    it ('Should be true for null', () => {
        assert.strictEqual(not(null), true);
    })
    it ('Should be true for undefined', () => {
        assert.strictEqual(not(), true);
    })
    it ('Should be true for undefined', () => {
        assert.strictEqual(not(undefined), true);
    })
    it ('Should be false for 0', () => {
        assert.strictEqual(not(0), false);
    })
    it ('Should be false for string_value', () => {
        assert.strictEqual(not("string_value"), false);
    })
    it ('Should be false for 100', () => {
        assert.strictEqual(not(100), false);
    })
})