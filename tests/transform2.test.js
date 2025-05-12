import { describe, it, expect } from "@olton/latte";
import { datetime } from "../src/index.js";

describe("Datetime Transform Methods", () => {
    it("should convert to date string", () => {
        const dt = datetime("2020-12-22");
        expect(dt.toDateString()).toBe('Tue Dec 22 2020');
    });

    it("should convert to ISO string", () => {
        const dt = datetime("2020-12-22");
        expect(dt.toISOString()).toBe('2020-12-22T00:00:00.000Z');
    });

    it("should convert to JSON", () => {
        const dt = datetime("2020-12-22");
        expect(dt.toJSON()).toBe('2020-12-22T00:00:00.000Z');
    });

    it("should convert to GMT string", () => {
        const dt = datetime("2020-12-22");
        expect(dt.toGMTString()).toBe('Tue, 22 Dec 2020 00:00:00 GMT');
    });

    it("should convert to locale date string", () => {
        // Note: This test might be environment-dependent
        const dt = datetime("2020-12-22");
        const result = dt.toLocaleDateString();
        
        // Check if it's a non-empty string (format may vary by locale)
        expect(result).toBeString();
        expect(result.length > 0).toBeTrue();
    });

    it("should convert to locale string", () => {
        // Note: This test might be environment-dependent
        const dt = datetime("2020-12-22");
        const result = dt.toLocaleString();
        
        // Check if it's a non-empty string (format may vary by locale)
        expect(result).toBeString();
        expect(result.length > 0).toBeTrue();
    });

    it("should convert to locale time string", () => {
        // Note: This test might be environment-dependent
        const dt = datetime("2020-12-22");
        const result = dt.toLocaleTimeString();
        
        // Check if it's a non-empty string (format may vary by locale)
        expect(result).toBeString();
        expect(result.length > 0).toBeTrue();
    });

    it("should convert to time string", () => {
        const dt = datetime("2020-12-22");
        const result = dt.toTimeString();
        
        // Check if it's a non-empty string and contains time information
        expect(result).toBeString();
        expect(result.length > 0).toBeTrue();
    });

    it("should convert to UTC string", () => {
        const dt = datetime("2020-12-22");
        expect(dt.toUTCString()).toBe('Tue, 22 Dec 2020 00:00:00 GMT');
    });

    it("should convert to native Date object", () => {
        const dt = datetime("2020-12-22");
        const result = dt.toDate();
        
        expect(result).toBeInstanceOf(Date);
        expect(result.getFullYear()).toBe(2020);
        expect(result.getMonth()).toBe(11); // December is 11 (0-based)
        expect(result.getDate()).toBe(22);
    });
});