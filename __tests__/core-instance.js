import assert from 'assert';
import chai from 'chai';
import {Datetime, datetime} from "../src";
import "../src/i18n/ru";

let expect = chai.expect;

describe('new Datetime()', () => {
    it ('Should return a instance of Datetime ', () => {
        assert.strictEqual(new Datetime() instanceof Datetime, true);
    });
});
