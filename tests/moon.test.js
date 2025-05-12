import {describe, it, expect, test} from "@olton/latte";
import {datetime} from "../src/index.js"
import "../src/plugins/moon.js"

describe('Moon phase...', () => {
    it('moon() test', () => {
        expect(datetime("2024-11-23").moon()).toBeObject({"phase":6,"name":"last-quarter"});
    })
});
