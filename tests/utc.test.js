import {describe, it, expect, test} from "@olton/latte";
import {datetime} from "../src/index.js"

describe("Test UTC mode", () => {
    it("Get now in utc", () => {
        const utc_now = datetime().utc().align("minute");
        const local_now = datetime().align("minute");
        const time_zone = new Date().getTimezoneOffset() * -1

        expect(utc_now.addMinute(time_zone).hour()).toBe(local_now.hour());
    })
    
    it("Get now in local", () => {
        const utc_now = datetime().utc().align("minute");
        const local_now = utc_now.clone().local();
        const time_zone = new Date().getTimezoneOffset() * -1

        expect(utc_now.addMinute(time_zone).hour()).toBe(local_now.hour());
    })
})