import {describe, it, expect} from "@olton/latte";
import {Datetime, datetime} from "../src/index.js"

import '../src/index.js';
import '../src/plugins/compare.js';

describe('Datetime', function() {
    it ('Older, Should be true', () => {
        expect(datetime("2020").older("2021")).toBe( true);
    })
    it ('Older, Should be false', () => {
        expect(datetime("2020").older("2019")).toBe( false);
    })

    it ('Younger, Should be true', () => {
        expect(datetime("2020").younger("2019")).toBe( true);
    })
    it ('Younger, Should be false', () => {
        expect(datetime("2020").younger("2021")).toBe( false);
    })

    it ('Between, Should be true', () => {
        expect(datetime("2020").between("2019", "2021")).toBe( true);
    })

    it ('Same, The Should be true', () => {
        expect(datetime("2020").same("2020")).toBe( true);
    })
    it ('Same, The Should be false', () => {
        expect(datetime("2020").same("2021")).toBe( false);
    })

    it ('Equal, The Should be true', () => {
        expect(datetime("2020").equal("2020")).toBe( true);
    })
    it ('Equal, The Should be false', () => {
        expect(datetime("2020").equal("2021")).toBe( false);
    })
    it ('Equal, The Should be false', () => {
        expect(datetime("2020-1").equal("2020-2")).toBe( false);
    })

    it ('NotEqual, The Should be true', () => {
        expect(datetime("2020").notEqual("2021")).toBe( true);
    })
    it ('NotEqual, The Should be false', () => {
        expect(datetime("2020").notEqual("2020")).toBe( false);
    })
    it ('NotEqual, The Should be false', () => {
        expect(datetime("2020-1").notEqual("2020-2")).toBe( true);
    })

    it ('olderOrEqual, The Should be true', () => {
        expect(datetime("2020").olderOrEqual("2021")).toBe( true);
    })
    it ('olderOrEqual, The Should be true', () => {
        expect(datetime("2020").olderOrEqual("2020")).toBe( true);
    })
    it ('olderOrEqual, The Should be false', () => {
        expect(datetime("2020").olderOrEqual("2019")).toBe( false);
    })

    it ('youngerOrEqual, The Should be true', () => {
        expect(datetime("2020").youngerOrEqual("2019"), true);
    })
    it ('youngerOrEqual, The Should be true', () => {
        expect(datetime("2020").youngerOrEqual("2020")).toBe( true);
    })
    it ('youngerOrEqual, The Should be false', () => {
        expect(datetime("2020").youngerOrEqual("2021")).toBe( false);
    })

    it ('compare, The Should be false', () => {
        expect(datetime("2020").compare("2019", "year", "x")).toBe( false);
    })
    it ('compare, The Should be false', () => {
        expect(datetime("2020").compare("2019", "year", null)).toBe( false);
    })

    it ('diff, The Should be 1', () => {
        expect(datetime("2020").diff("2019").year).toBe( 1);
    })
    it ('diff, The Should be 1', () => {
        expect(datetime("2020").distance("2019", "year")).toBe( 1);
    })
})