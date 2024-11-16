import {describe, it, expect, test} from "@olton/easytest";
import {datetime} from "../src/index.js"
import "../src/plugins/buddhist"

describe('buddhist() test', () => {
    it('Should be 2563 for 2020', () => {
        expect(datetime("2020").buddhist()).toBe(2563);
    })
    it('Should be 2563 for 2020', () => {
        expect(datetime("2020").format('BB')).toBe('63');
    })
    it('Should be 2563 for 2020', () => {
        expect(datetime("2020").format()).toBe('2020-01-01T02:00:00.000');
    })
    it('Should be 2563 for 2020', () => {
        expect(datetime("2020").format('BBBB')).toBe('2563');
    })
});
