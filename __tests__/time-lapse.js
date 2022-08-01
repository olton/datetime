import {Datetime, datetime} from "../src/index.js"

describe('timeLapse() test', () => {
    test('1', () => {
        expect(datetime(1642006980000).timeLapse()).toBe("6 mon");
    })
    test('1', () => {
        expect(Datetime.timeLapse(1642006980000)).toBe("6 mon");
    })
});
