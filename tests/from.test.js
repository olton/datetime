import {describe, it, expect} from "@olton/latte";
import {Datetime, datetime} from "../src/index.js";

import '../src/plugins/from.js';
import locale from '../src/i18n/uk.js';

let str = "21 Dec 1972 06:12:54.321";
let str2 = "21-12-1972 06:12:54.321";
let str3 = "21-13-1972 06:12:54.321";
let date = datetime("21 Dec 1972");

Datetime.setLocale("uk", locale)

describe('Parse date from string', function() {
    it ('Should be true', () => {
        expect(Datetime.from("21 Dec 1972", "DD MM YYYY")).toBeInstanceOf(Datetime);
    })
    it ('Should be true', () => {
        expect(Datetime.from("21 Dec 1972", "DD MM YYYY")).toBeInstanceOf(Datetime);
    })
    it ('Should be equal', () => {
        expect(Datetime.from("21 Dec 1972", "DD MM YYYY").format()).toBe(date.format());
    })
    it ('Should be 11', () => {
        expect(Datetime.from(str, "DD MM YYYY").month()).toBe( 11);
    })
    it ('Should be 21', () => {
        expect(Datetime.from(str, "DD MM YYYY").day()).toBe( 21);
    })
    it ('Should be 321', () => {
        expect(Datetime.from(str, "DD MM YYYY hh:mm:ss:sss").ms()).toBe(321);
    })
    it ('Should be 1972', () => {
        expect(Datetime.from(str2, "DD-MM-YYYY").year()).toBe(1972);
    })
    it ('Should be ...', () => {
        expect(Datetime.from("21 1972 12", "DD YYYY MM").year()).toBe(1972);
        expect(Datetime.from("21 1972 12", "DD YYYY MM").day()).toBe(21);
        expect(Datetime.from("21 1972 12", "DD YYYY MM").month()).toBe(11);
        expect(Datetime.from("21 1972 12", "DD YYYY MM").day()).toBe(21);
    })
    it ('Should be 11', () => {
        expect(Datetime.from("21 1972 13", "DD YYYY MM").month()).toBe( 0);
        expect(Datetime.from("21 1972 Dex", "DD YYYY MM").month()).toBe( 0);
        expect(Datetime.from("21 1972", "DD YYYY MM").month()).toBe( 0);
    })
    it ('Should be 11', () => {
        expect(Datetime.from("1972 12", "YYYY MM").month()).toBe( 11);
    })
    it ('Should be 17', () => {
        expect(Datetime.from("17:53:26", "HH:MI:SS").hour()).toBe( 17);
    })
    it ('Should be 53', () => {
        expect(Datetime.from("17:53:26", "HH:MI:SS").minute()).toBe( 53);
    })
    it ('Should be 26', () => {
        expect(Datetime.from("17:53:26", "HH:MI:SS").second()).toBe(26);
    })
    it ('Should be 26', () => {
        expect(Datetime.from("21 Грудня 1972", "DD MM YYYY", "uk").month()).toBe( 11);
    })
    it ('Should be INVALID', () => {
        expect(() => {Datetime.from("::", "DD MM YYYY")}).toThrow();
    })
})