import {describe, it, expect} from "@olton/latte";
import {Datetime, datetime} from "../src/index.js";
import '../src/plugins/hour12.js';
import '../src/plugins/century.js';
import '../src/plugins/dayofyear.js';
import '../src/plugins/isleapyear.js';
import '../src/plugins/weeknumber.js';
import '../src/plugins/iso.js';
import '../src/plugins/timezone.js';
import '../src/plugins/transform.js';
import '../src/plugins/strftime.js';

describe('Datetime test template', function() {
    it ('Should be true', () => {
        expect(datetime("2020-12-21").strftime()).toBe( '2020-12-21T02:00:00.000+02:00');
    })
    it ('Should be true', () => {
        expect(datetime("2020-12-21").strftime("%d-%m-%Y")).toBe( '21-12-2020');
    })
    it ('Should be true', () => {
        expect(datetime("2020-12-21").strftime("%d-%m-%Y %1")).toBe( '21-12-2020 %1');
    })
})