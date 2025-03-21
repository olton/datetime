import {describe, it, assert} from "@olton/easytest";
import {Datetime, datetime} from "../src";
import '../src/plugins/min';

describe('Datetime test template', function() {
    it ('Should be ', () => {
        assert.strictEqual(Datetime.min("2020", "2021", "1972").year(), 1972);
    })
    it ('Should be ', () => {
        assert.strictEqual(datetime("2020").min("2021", "1972").year(), 1972);
    })
})