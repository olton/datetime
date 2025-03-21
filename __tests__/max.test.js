import {describe, it, assert} from "@olton/easytest";
import {Datetime, datetime} from "../src";
import '../src/plugins/max';

describe('Datetime test template', function() {
    it ('Should be ', () => {
        assert.strictEqual(Datetime.max("2020", "2021", "1972").year(), 2021);
    })
    it ('Should be ', () => {
        assert.strictEqual(datetime("2020").max("2021", "1972").year(), 2021);
    })
})