import {describe, it} from "@olton/easytest";
import {Datetime} from "../src/index.js"
import "../src/plugins/buddhist"

describe('parseTime() test', () => {
    it('Should be 3000 for 3s', () => {
        expect(Datetime.parseTime("3s")).toBe(3000);
    })
    it('Should be 300000 for 5m', () => {
        expect(Datetime.parseTime("5m")).toBe(300000);
    })
});
