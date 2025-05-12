import {describe, it, expect} from "@olton/latte";
import {Datetime, datetime} from "../src/index.js";
import '../src/plugins/max.js';

describe('Datetime test template', function() {
    it ('Should be ', () => {
        expect(Datetime.max("2020", "2021", "1972").year()).toBe(2021);
    })
    it ('Should be ', () => {
        expect(datetime("2020").max("2021", "1972").year()).toBe(2021);
    })
})