import { describe, it, expect } from "@olton/latte";
import { datetime } from "../src/index.js";

describe("Datetime Week Number Methods", () => {
    it("should calculate week number with default start (Sunday)", () => {
        // January 1, 2023 is a Sunday (first day of the week)
        const dt = datetime("2023-01-01");
        expect(dt.weekNumber()).toBe(1);
        
        // January 8, 2023 is a Sunday (start of second week)
        const dt2 = datetime("2023-01-08");
        expect(dt2.weekNumber()).toBe(2);
    });
    
    it("should calculate week number with custom start (Monday)", () => {
        // January 1, 2023 is a Sunday, but with Monday as start, it's still week 1
        const dt = datetime("2023-01-01");
        expect(dt.weekNumber(1)).toBe(1, "Week starts on Monday");
        
        // January 2, 2023 is a Monday (start of second week with Monday as start)
        const dt2 = datetime("2023-01-02");
        expect(dt2.weekNumber(1)).toBe(1);
    });
    
    it("should calculate ISO week number (Monday start)", () => {
        // ISO weeks start on Monday
        const dt = datetime("2023-01-02"); // Monday, January 2, 2023
        expect(dt.isoWeekNumber()).toBe(1, "Test 1");
        
        // January 1, 2023 is a Sunday, in ISO week numbering it's the last week of 2022
        const dt2 = datetime("2023-01-01");
        expect(dt2.isoWeekNumber()).toBe(52, "Test 2");
    });
    
    it("should calculate weeks in year", () => {
        // 2023 has 52 weeks
        const dt = datetime("2023-01-01");
        expect(dt.weeksInYear(0)).toBe(52, "Test 1.1");
        expect(dt.weeksInYear(1)).toBe(52, "Test 1.2");
        
        // 2020 has 53 weeks (leap year)
        const dt2 = datetime("2020-01-01");
        expect(dt2.weeksInYear(0)).toBe(53, "Test 2.1");
        expect(dt2.weeksInYear(1)).toBe(53, "Test 2.2");
    });
    
    it("should format with week number specifiers", () => {
        // First week of 2023
        const dt = datetime("2023-01-04"); // Wednesday of first week
        
        // W - week number
        expect(dt.format("W")).toBe("1");
        
        // WW - week number with leading zero
        expect(dt.format("WW")).toBe("01");
        
        // WWW - ISO week number
        expect(dt.format("WWW")).toBe("1");
        
        // WWWW - ISO week number with leading zero
        expect(dt.format("WWWW")).toBe("01");
    });
    
    it("should format with week number and other specifiers", () => {
        const dt = datetime("2023-01-04");
        
        // Format with year, month, day and week number
        expect(dt.format("YYYY-MM-DD (WW)")).toBe("2023-01-04 (01)");
        
        // Format with ISO week number
        expect(dt.format("WWWW")).toBe("01");
    });
    
    it("should handle week numbers at year boundaries", () => {
        // December 31, 2023 is a Sunday
        const dt = datetime("2023-12-31");
        expect(dt.weekNumber(0)).toBe(1); // Last week of 2023
        expect(dt.weekNumber(1)).toBe(52); // Last week of 2023
        
        // January 1, 2024 is a Monday
        const dt2 = datetime("2024-01-01");
        expect(dt2.weekNumber()).toBe(1); // First week of 2024
        
        // With ISO week numbering (Monday start)
        expect(dt.isoWeekNumber()).toBe(52); // Last ISO week of 2023
        expect(dt2.isoWeekNumber()).toBe(1); // First ISO week of 2024
    });
});