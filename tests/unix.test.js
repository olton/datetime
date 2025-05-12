import {describe, it, expect} from "@olton/latte";
import {Datetime, datetime} from "../src/index.js";
import '../src/plugins/unix.js';

describe('unix()', () => {
    it ('Datetime.timestamp() === new Date().getTime() / 1000 Should be true', () => {
        expect(Datetime.timestamp() === new Date().getTime() / 1000).toBe( true);
    })
    it ('Should be true for datetime(2020).unix() === new Date(2020).getTime() / 1000', () => {
        expect(datetime("2020").unix() === new Date("2020").getTime() / 1000).toBe( true);
    })
    it ('Should be true', () => {
        expect(datetime("2020-12-21").unix()).toBe( 1608508800);
        expect(datetime("2020-12-21").unix(null)).toBe( 1608508800);
    })
    it ('Should be true', () => {
        expect(datetime("2020-12-21").unix(1608508801).unix()).toBe( 1608508801);
    })
    it ('Should be true', () => {
        expect(datetime("2020-12-21").immutable().unix(1608508801).unix()).toBe( 1608508801);
    })
    it ('Should be true', () => {
        expect(datetime("2020-12-21").timestamp()).toBe( 1608508800);
    })
});
