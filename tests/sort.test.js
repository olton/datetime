import {describe, it, expect} from "@olton/latte";
import {Datetime, datetime} from "../src/index.js";
import '../src/plugins/sort.js';

describe('Datetime test template', function() {
    it ('Should be true', () => {
        expect(Datetime.sort(["2020", "2021", "1972"])[0].year()).toBe(1972);
    })
    it ('Should be true', () => {
        expect(Datetime.sort(["2020", "2021", "1972"], "desc")[0].year()).toBe(2021);
    })
    it ('Should be true', () => {
        expect(Datetime.sort(["2020", "2021", "1972"], {})[0].year()).toBe( 1972);
        expect(Datetime.sort(["2020", "2021", "1972"], {dir: "asc"})[0].year()).toBe( 1972);
        expect(Datetime.sort(["2020", "2021", "1972"], {dir: "desc"})[0].year()).toBe( 2021);
        expect(Datetime.sort(["2020", "2021", "1972"], {format: "YYYY"})[0]).toBe( '1972');
        expect(Datetime.sort(["2020", "2021", "1972"], {returnAs: "date"})[0].getFullYear()).toBe( 1972);
    })
})