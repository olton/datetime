import {describe, it, expect} from "@olton/latte";
import {Datetime, datetime} from "../src/index.js";
import ua_locale from "../src/i18n/uk.js";

Datetime.setLocale("uk", ua_locale)

describe('immutable()', () => {
    it ('The mutable Should be false', () => {
        expect(datetime().immutable().mutable).toBe( false);
    })
    it ('The mutable Should be true', () => {
        expect(datetime().immutable(false).mutable).toBe( true);
    })
    it ('The mutable Should be false', () => {
        var date = datetime().immutable();
        expect(date.addDay(1) === date).toBe( false);
    })
    it ('The mutable Should be true', () => {
        var date = datetime().immutable(false);
        expect(date.addDay(1) === date).toBe( true);
    })
    it ('The mutable Should be true', () => {
        var date = datetime();
        expect(date.addDay(1) === date).toBe( true);
    })
});
