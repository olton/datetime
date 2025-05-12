import { describe, it, expect } from "@olton/latte";
import { Datetime, datetime } from "../src/index.js";

describe("Datetime Core Functionality", () => {
    it("should create a valid Datetime instance", () => {
        const dt = datetime("2023-05-15");
        expect(dt).toBeInstanceOf(Datetime);
    });

    it("should return correct year", () => {
        const dt = datetime("2023-05-15");
        expect(dt.year()).toBe(2023);
    });

    it("should return correct month (0-based)", () => {
        const dt = datetime("2023-05-15");
        expect(dt.month()).toBe(4); // May is month 4 (0-based)
    });

    it("should return correct day", () => {
        const dt = datetime("2023-05-15");
        expect(dt.day()).toBe(15);
    });

    it("should format date correctly", () => {
        const dt = datetime("2023-05-15");
        expect(dt.format("YYYY-MM-DD")).toBe("2023-05-15");
    });

    it("should add days correctly", () => {
        const dt = datetime("2023-05-15");
        const newDt = dt.addDay(5);
        expect(newDt.day()).toBe(20);
    });

    it("should add months correctly", () => {
        const dt = datetime("2023-05-15");
        const newDt = dt.addMonth(2);
        expect(newDt.month()).toBe(6); // July is month 6 (0-based)
    });

    it("should add years correctly", () => {
        const dt = datetime("2023-05-15");
        const newDt = dt.addYear(2);
        expect(newDt.year()).toBe(2025);
    });

    it("should clone correctly", () => {
        const dt = datetime("2023-05-15");
        const clone = dt.clone();
        
        expect(clone).toBeInstanceOf(Datetime);
        expect(clone.format("YYYY-MM-DD")).toBe("2023-05-15");
        
        // Modifying clone should not affect original
        clone.addDay(1);
        expect(dt.day()).toBe(15);
        expect(clone.day()).toBe(16);
    });

    it("should handle immutability correctly", () => {
        const dt = datetime("2023-05-15").immutable(true);
        const newDt = dt.addDay(1);
        
        expect(dt.day()).toBe(15); // Original unchanged
        expect(newDt.day()).toBe(16); // New instance with updated value
    });
});

describe("Datetime Static Methods", () => {
    it("should check if value is Datetime instance", () => {
        const dt = datetime("2023-05-15");
        const notDt = new Date("2023-05-15");
        
        expect(Datetime.isDatetime(dt)).toBeTrue();
        expect(Datetime.isDatetime(notDt)).toBeFalse();
    });

    it("should get current time with now()", () => {
        const now = Datetime.now();
        expect(now).toBeNumber();
        
        const nowDate = Datetime.now(true);
        expect(nowDate).toBeInstanceOf(Date);
    });

    it("should parse date string", () => {
        const dt = Datetime.parse("2023-05-15");
        expect(dt).toBeInstanceOf(Datetime);
        expect(dt.format("YYYY-MM-DD")).toBe("2023-05-15");
    });
});