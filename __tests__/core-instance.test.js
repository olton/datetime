import {describe, it, expect} from "@olton/easytest";
import {Datetime, datetime} from "../src/index.js";

describe('new Datetime()', () => {
    it ('Should return a instance of Datetime ', () => {
        expect(new Datetime() instanceof Datetime).toBe(true);
    });
});
