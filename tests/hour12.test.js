import {describe, it, expect} from "@olton/latte";
import {Datetime, datetime} from "../src/index.js";
import '../src/plugins/hour12.js';

describe('Datetime', function() {
    describe('ampm()', () => {
        it ('Should be PM for 2020 20:00', () => {
            expect(datetime("2020 20:00").ampm()).toBe("PM");
        })
        it ('Should be am for 2020 10:00 and true for second argument', () => {
            expect(datetime("2020 10:00").ampm(true)).toBe("am");
        })
        it ('Should be am for 2020 10:00 and true for second argument', () => {
            expect(datetime("2020 10:00").hour12()).toBe(10);
        })
        it ('Should be 11', () => {
            expect(datetime("2020 10:00").hour12(11).hour()).toBe(11);
        })
        it ('Should be 11', () => {
            expect(datetime("2020 10:00").hour12(11, "pm").hour()).toBe(23);
        })
        it ('Should be formated', () => {
            expect(datetime("2020 10:00").format()).toBe("2020-01-01T10:00:00.000");
        })
        it ('Should be formated', () => {
            expect(datetime("2020 10:00").format("YYYY hh:mm")).toBe("2020 10:00");
        })
    });

})