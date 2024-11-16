import {describe, it, expect} from "@olton/easytest";
import {Datetime, datetime} from "../src/index.js"

describe('timeLapse() test', () => {
    it('1', () => {
        expect(datetime(new Date().getTime()).timeLapse()).toBe("few sec");
    })
});
