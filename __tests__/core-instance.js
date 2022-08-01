import assert from 'assert';
import {Datetime, datetime} from "../src/index.js";

describe('new Datetime()', () => {
    it ('Should return a instance of Datetime ', () => {
        assert.strictEqual(new Datetime() instanceof Datetime, true);
    });
});
