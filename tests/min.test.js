import {describe, it, expect} from "@olton/latte";
import {Datetime, datetime} from "../src/index.js";
import '../src/plugins/min.js';

describe('Datetime test template', function() {
    it ('Should be ', () => {
        expect(Datetime.min("2020", "2021", "1972").year()).toBe( 1972);
    })
    it ('Should be ', () => {
        expect(datetime("2020").min("2021", "1972").year()).toBe( 1972);
    })
})