import {Datetime, datetime} from "../src"

describe('timeLapse() test', () => {
    test('1', () => {
        expect(datetime(1642006980000).timeLapse()).toBe("18 min");
    })
    test('1', () => {
        expect(Datetime.timeLapse(1642006980000)).toBe("18 min");
    })
});
