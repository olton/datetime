import {describe, it, expect, test} from "@olton/easytest";
import {datetime} from "../src/index.js"
import "../src/plugins/moon.js"

describe('Moon phase...', () => {
    it('moon() test', () => {
        expect(datetime("2024-11-23").moon()).toBe(5);
    })
});
