import assert from 'assert';
import chai from 'chai';
import {Datetime, datetime} from "../src";
import "../src/i18n/ru";

let expect = chai.expect;

describe('immutable()', () => {
    it ('The mutable Should be false', () => {
        assert.strictEqual(datetime().immutable().mutable, false);
    })
    it ('The mutable Should be true', () => {
        assert.strictEqual(datetime().immutable(false).mutable, true);
    })
    it ('The mutable Should be false', () => {
        var date = datetime().immutable();
        assert.strictEqual(date.addDay(1) === date, false);
    })
    it ('The mutable Should be true', () => {
        var date = datetime().immutable(false);
        assert.strictEqual(date.addDay(1) === date, true);
    })
    it ('The mutable Should be true', () => {
        var date = datetime();
        assert.strictEqual(date.addDay(1) === date, true);
    })
});
