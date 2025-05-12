import {describe, it, expect} from "@olton/latte";
import {lpad} from "../src/helpers/lpad.js";
import {not} from "../src/helpers/not.js";

describe('Datetime Utils', function() {
    it ('Should be 009', () => {
        expect(lpad(9, "0", 3)).toBe('009');
    })
    it ('Should be 009', () => {
        expect(lpad(9, 0, 3)).toBe('009');
    })
    it ('Should be 19', () => {
        expect(lpad(19, "0", 2)).toBe('19');
    })
    it ('Should be true for null', () => {
        expect(not(null)).toBeTrue()
    })
    it ('Should be true for undefined', () => {
        expect(not()).toBeTrue()
    })
    it ('Should be true for undefined', () => {
        expect(not(undefined)).toBeTrue()
    })
    it ('Should be false for 0', () => {
        expect(not(0)).toBeFalse()
    })
    it ('Should be false for string_value', () => {
        expect(not("null")).toBeFalse()
    })
    it ('Should be false for 100', () => {
        expect(not(100)).toBeFalse()
    })
})