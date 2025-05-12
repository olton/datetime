import {describe, it, expect} from "@olton/latte";
import {Datetime, datetime} from "../src/index.js";
import '../src/plugins/decade.js';

describe('Decade plugin test', function() {
    it ('Should be true', () => {
        expect(datetime("1972").decade()).toBe(1970);
    })
    it ('Should be 1970', () => {
        expect(datetime("1972").decadeStart().year()).toBe(1970);
    })
    it ('Should be 1970', () => {
        expect(datetime("1972").immutable().decadeStart().year()).toBe(1970);
    })
    it ('Should be 1979', () => {
        expect(datetime("1972").decadeEnd().year()).toBe(1979);
    })
    it ('Should be 1979', () => {
        expect(datetime("1972").immutable().decadeEnd().year()).toBe(1979);
    })
    it ('Should be 2', () => {
        expect(datetime("2020-2-3").decadeOfMonth()).toBe(1);
    })
    it ('Should be 2', () => {
        expect(datetime("2020-2-13").decadeOfMonth()).toBe( 2);
    })
    it ('Should be 3', () => {
        expect(datetime("2020-2-23").decadeOfMonth()).toBe( 3);
    })
    it ('Should be 1979', () => {
        expect(datetime("2020-2-13").immutable().decadeOfMonth()).toBe( 2);
    })
})