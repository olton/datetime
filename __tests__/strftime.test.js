import {describe, it, assert} from "@olton/easytest";
import {Datetime, datetime} from "../src";
import '../src/plugins/hour12';
import '../src/plugins/century';
import '../src/plugins/dayofyear';
import '../src/plugins/isleapyear';
import '../src/plugins/weeknumber';
import '../src/plugins/iso';
import '../src/plugins/timezone';
import '../src/plugins/transform';
import '../src/plugins/strftime';

describe('Datetime test template', function() {
    it ('Should be true', () => {
        assert.strictEqual(datetime("2020-12-21").strftime(), '2020-12-21T02:00:00.000+02:00');
    })
    it ('Should be true', () => {
        assert.strictEqual(datetime("2020-12-21").strftime("%d-%m-%Y"), '21-12-2020');
    })
    it ('Should be true', () => {
        assert.strictEqual(datetime("2020-12-21").strftime("%d-%m-%Y %1"), '21-12-2020 %1');
    })
})