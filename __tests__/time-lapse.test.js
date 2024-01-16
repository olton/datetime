import {describe, test, expect} from "vitest";
import {Datetime, datetime} from "../src/index.js"

describe('timeLapse() test', () => {
    test('1', () => {
        expect(datetime(new Date().getTime()).timeLapse()).toBe("few sec");
    })
});
