declare module 'datetime' {
  export class Datetime {
    // Constructor
    /**
     * Creates a new Datetime instance
     * @param {...any} args - Arguments to pass to the Date constructor
     */
    constructor(...args: any[]);

    // Properties
    /**
     * The underlying Date object
     */
    value: Date;

    /**
     * The current locale code
     */
    locale: string;

    /**
     * The first day of the week (0 = Sunday, 1 = Monday, etc.)
     */
    weekStart: number;

    /**
     * Whether the instance is in UTC mode
     */
    utcMode: boolean;

    /**
     * Whether the instance is mutable
     */
    mutable: boolean;

    // Static properties
    /**
     * Available locales for date formatting
     */
    static locales: Record<string, any>;

    // Static methods
    /**
     * Checks if a value is a Datetime instance
     * @param {any} val - The value to check
     * @returns {boolean} True if the value is a Datetime instance
     */
    static isDatetime(val: any): boolean;

    /**
     * Gets the current time
     * @param {boolean} asDate - Whether to return a Datetime instance or timestamp
     * @returns {number | Datetime} Current timestamp or Datetime instance
     */
    static now(asDate?: boolean): number | Datetime;

    /**
     * Parses a date string
     * @param {string} str - The date string to parse
     * @returns {Datetime} A new Datetime instance
     */
    static parse(str: string): Datetime;

    /**
     * Sets a locale for date formatting
     * @param {string} name - The locale name
     * @param {any} locale - The locale object
     */
    static setLocale(name: string, locale: any): void;

    /**
     * Gets a locale object
     * @param {string} name - The locale name
     * @returns {any} The locale object
     */
    static getLocale(name?: string): any;

    /**
     * Aligns a date to the start of a specified unit
     * @param {Date | Datetime} date - The date to align
     * @param {string} align - The unit to align to (s, m, h, D, M, Y, W)
     * @returns {Datetime} A new aligned Datetime instance
     */
    static align(date: Date | Datetime, align: string): Datetime;

    /**
     * Aligns a date to the end of a specified unit
     * @param {Date | Datetime} date - The date to align
     * @param {string} align - The unit to align to (s, m, h, D, M, Y, W)
     * @returns {Datetime} A new aligned Datetime instance
     */
    static alignEnd(date: Date | Datetime, align: string): Datetime;

    // Instance methods
    /**
     * Sets whether the instance is immutable
     * @param {boolean} v - Whether the instance should be immutable
     * @returns {this} The current instance
     */
    immutable(v?: boolean): this;

    /**
     * Sets the instance to UTC mode
     * @returns {this} The current instance
     */
    utc(): this;

    /**
     * Sets the instance to local mode
     * @returns {this} The current instance
     */
    local(): this;

    /**
     * Sets the locale for the instance
     * @param {string} val - The locale name
     * @param {boolean} override - Whether to override the locale if it doesn't exist
     * @returns {this} The current instance
     */
    useLocale(val: string, override?: boolean): this;

    /**
     * Creates a clone of the instance
     * @returns {Datetime} A new Datetime instance
     */
    clone(): Datetime;

    /**
     * Aligns the instance to the start of a specified unit
     * @param {string} to - The unit to align to (s, m, h, D, M, Y, W)
     * @returns {Datetime} The aligned instance or a new instance if immutable
     */
    align(to: string): Datetime;

    /**
     * Aligns the instance to the end of a specified unit
     * @param {string} to - The unit to align to (s, m, h, D, M, Y, W)
     * @returns {Datetime} The aligned instance or a new instance if immutable
     */
    alignEnd(to: string): Datetime;

    /**
     * Gets or sets the underlying Date value
     * @param {Date | number | string} val - The new value
     * @returns {Date | this} The Date value or the current instance
     */
    val(val?: Date | number | string): Date | this;

    /**
     * Gets the last two digits of the year
     * @returns {number} The last two digits of the year
     */
    year2(): number;

    // Get/Set methods
    /**
     * Gets or sets the milliseconds
     * @param {number} val - The new value
     * @returns {number | this} The milliseconds or the current instance
     */
    ms(val?: number): number | this;

    /**
     * Gets or sets the seconds
     * @param {number} val - The new value
     * @returns {number | this} The seconds or the current instance
     */
    second(val?: number): number | this;

    /**
     * Gets or sets the minutes
     * @param {number} val - The new value
     * @returns {number | this} The minutes or the current instance
     */
    minute(val?: number): number | this;

    /**
     * Gets or sets the hours
     * @param {number} val - The new value
     * @returns {number | this} The hours or the current instance
     */
    hour(val?: number): number | this;

    /**
     * Gets or sets the day of the month
     * @param {number} val - The new value
     * @returns {number | this} The day or the current instance
     */
    day(val?: number): number | this;

    /**
     * Gets or sets the month (0-11)
     * @param {number} val - The new value
     * @returns {number | this} The month or the current instance
     */
    month(val?: number): number | this;

    /**
     * Gets or sets the year
     * @param {number} val - The new value
     * @returns {number | this} The year or the current instance
     */
    year(val?: number): number | this;

    /**
     * Gets or sets the timestamp
     * @param {number} val - The new value
     * @returns {number | this} The timestamp or the current instance
     */
    time(val?: number): number | this;

    /**
     * Gets or sets the day of the week
     * @param {number} val - The new value
     * @returns {number | this} The day of the week or the current instance
     */
    weekDay(val?: number): number | this;

    /**
     * Gets a value by unit name
     * @param {string} unit - The unit name
     * @returns {any} The value
     */
    get(unit: string): any;

    /**
     * Sets a value by unit name
     * @param {string} unit - The unit name
     * @param {any} val - The new value
     * @returns {this} The current instance
     */
    set(unit: string, val: any): this;

    // Add methods
    /**
     * Adds a value to a specified unit
     * @param {number} val - The value to add
     * @param {string} to - The unit to add to (s, m, h, D, M, Y, W)
     * @returns {this} The current instance
     */
    add(val: number, to: string): this;

    /**
     * Adds hours
     * @param {number} v - The number of hours to add
     * @returns {this} The current instance
     */
    addHour(v: number): this;

    /**
     * Adds minutes
     * @param {number} v - The number of minutes to add
     * @returns {this} The current instance
     */
    addMinute(v: number): this;

    /**
     * Adds seconds
     * @param {number} v - The number of seconds to add
     * @returns {this} The current instance
     */
    addSecond(v: number): this;

    /**
     * Adds milliseconds
     * @param {number} v - The number of milliseconds to add
     * @returns {this} The current instance
     */
    addMs(v: number): this;

    /**
     * Adds days
     * @param {number} v - The number of days to add
     * @returns {this} The current instance
     */
    addDay(v: number): this;

    /**
     * Adds weeks
     * @param {number} v - The number of weeks to add
     * @returns {this} The current instance
     */
    addWeek(v: number): this;

    /**
     * Adds months
     * @param {number} v - The number of months to add
     * @returns {this} The current instance
     */
    addMonth(v: number): this;

    /**
     * Adds years
     * @param {number} v - The number of years to add
     * @returns {this} The current instance
     */
    addYear(v: number): this;

    // Formatting
    /**
     * Formats the date according to the specified format string
     * @param {string} fmt - The format string
     * @param {string} locale - The locale to use
     * @returns {string} The formatted date string
     */
    format(fmt?: string, locale?: string): string;

    /**
     * Returns the timestamp
     * @returns {number} The timestamp
     */
    valueOf(): number;

    /**
     * Returns the string representation of the date
     * @returns {string} The string representation
     */
    toString(): string;

    // Plugin methods - strftime
    /**
     * Formats the date using strftime-style format specifiers
     * @param {string} fmt - The format string
     * @param {string} locale - The locale to use
     * @returns {string} The formatted date string
     */
    strftime(fmt?: string, locale?: string): string;

    // Plugin methods - weeknumber
    /**
     * Gets the week number of the year
     * @param {number} weekStart - The first day of the week (0 = Sunday, 1 = Monday, etc.)
     * @returns {number} The week number
     */
    weekNumber(weekStart?: number): number;

    /**
     * Gets the ISO week number of the year
     * @returns {number} The ISO week number
     */
    isoWeekNumber(): number;

    /**
     * Gets the number of weeks in the year
     * @param {number} weekStart - The first day of the week (0 = Sunday, 1 = Monday, etc.)
     * @returns {number} The number of weeks
     */
    weeksInYear(weekStart?: number): number;

    // Plugin methods - today, tomorrow, yesterday
    /**
     * Checks if the date is today
     * @returns {boolean} True if the date is today
     */
    isToday(): boolean;

    /**
     * Checks if the date is tomorrow
     * @returns {boolean} True if the date is tomorrow
     */
    isTomorrow(): boolean;

    /**
     * Checks if the date is yesterday
     * @returns {boolean} True if the date is yesterday
     */
    isYesterday(): boolean;

    // Plugin methods - timezone
    /**
     * Gets the timezone offset as a string
     * @returns {string} The timezone offset
     */
    timezone(): string;

    /**
     * Gets the timezone name
     * @returns {string} The timezone name
     */
    timezoneName(): string;

    /**
     * Gets the UTC offset in minutes
     * @returns {number} The UTC offset
     */
    utcOffset(): number;

    // Plugin methods - hour12
    /**
     * Gets or sets the hour in 12-hour format
     * @param {number} val - The new value
     * @returns {number | this} The hour or the current instance
     */
    hour12(val?: number): number | this;

    /**
     * Gets the AM/PM indicator
     * @param {boolean} lower - Whether to return lowercase
     * @returns {string} The AM/PM indicator
     */
    ampm(lower?: boolean): string;

    // Plugin methods - dayofyear
    /**
     * Gets the day of the year
     * @returns {number} The day of the year (1-366)
     */
    dayOfYear(): number;

    // Plugin methods - century
    /**
     * Gets the century
     * @returns {number} The century
     */
    century(): number;

    // Plugin methods - iso
    /**
     * Gets the ISO day of the week (1-7, where 1 is Monday)
     * @returns {number} The ISO day of the week
     */
    isoWeekDay(): number;

    // Plugin methods - compare
    /**
     * Checks if two dates are the same
     * @param {Date | Datetime} date - The date to compare with
     * @param {string} unit - The unit to compare (year, month, day, etc.)
     * @returns {boolean} True if the dates are the same
     */
    isSame(date: Date | Datetime, unit?: string): boolean;

    /**
     * Checks if the date is before another date
     * @param {Date | Datetime} date - The date to compare with
     * @param {string} unit - The unit to compare (year, month, day, etc.)
     * @returns {boolean} True if the date is before the other date
     */
    isBefore(date: Date | Datetime, unit?: string): boolean;

    /**
     * Checks if the date is after another date
     * @param {Date | Datetime} date - The date to compare with
     * @param {string} unit - The unit to compare (year, month, day, etc.)
     * @returns {boolean} True if the date is after the other date
     */
    isAfter(date: Date | Datetime, unit?: string): boolean;

    /**
     * Checks if the date is between two other dates
     * @param {Date | Datetime} date1 - The first date
     * @param {Date | Datetime} date2 - The second date
     * @param {string} unit - The unit to compare (year, month, day, etc.)
     * @returns {boolean} True if the date is between the two dates
     */
    isBetween(date1: Date | Datetime, date2: Date | Datetime, unit?: string): boolean;

    /**
     * Checks if two dates are the same
     * @param {Date | Datetime} d - The date to compare with
     * @returns {boolean} True if the dates are the same
     */
    same(d: Date | Datetime): boolean;

    /**
     * Compares two dates
     * @param {Date | Datetime} d - The date to compare with
     * @param {string} align - The unit to align to before comparing
     * @param {string} operator - The comparison operator
     * @returns {boolean} The result of the comparison
     */
    compare(d: Date | Datetime, align?: string, operator?: string): boolean;

    /**
     * Checks if the date is between two other dates
     * @param {Date | Datetime} d1 - The first date
     * @param {Date | Datetime} d2 - The second date
     * @returns {boolean} True if the date is between the two dates
     */
    between(d1: Date | Datetime, d2: Date | Datetime): boolean;

    /**
     * Checks if the date is older than another date
     * @param {Date | Datetime} date - The date to compare with
     * @param {string} align - The unit to align to before comparing
     * @returns {boolean} True if the date is older
     */
    older(date: Date | Datetime, align?: string): boolean;

    /**
     * Checks if the date is older than or equal to another date
     * @param {Date | Datetime} date - The date to compare with
     * @param {string} align - The unit to align to before comparing
     * @returns {boolean} True if the date is older or equal
     */
    olderOrEqual(date: Date | Datetime, align?: string): boolean;

    /**
     * Checks if the date is younger than another date
     * @param {Date | Datetime} date - The date to compare with
     * @param {string} align - The unit to align to before comparing
     * @returns {boolean} True if the date is younger
     */
    younger(date: Date | Datetime, align?: string): boolean;

    /**
     * Checks if the date is younger than or equal to another date
     * @param {Date | Datetime} date - The date to compare with
     * @param {string} align - The unit to align to before comparing
     * @returns {boolean} True if the date is younger or equal
     */
    youngerOrEqual(date: Date | Datetime, align?: string): boolean;

    /**
     * Checks if the date is equal to another date
     * @param {Date | Datetime} date - The date to compare with
     * @param {string} align - The unit to align to before comparing
     * @returns {boolean} True if the dates are equal
     */
    equal(date: Date | Datetime, align?: string): boolean;

    /**
     * Checks if the date is not equal to another date
     * @param {Date | Datetime} date - The date to compare with
     * @param {string} align - The unit to align to before comparing
     * @returns {boolean} True if the dates are not equal
     */
    notEqual(date: Date | Datetime, align?: string): boolean;

    /**
     * Gets the difference between two dates
     * @param {Date | Datetime} d - The date to compare with
     * @returns {Record<string, number>} The difference in various units
     */
    diff(d: Date | Datetime): Record<string, number>;

    /**
     * Gets the distance between two dates in a specified unit
     * @param {Date | Datetime} d - The date to compare with
     * @param {string} align - The unit to measure the distance in
     * @returns {number} The distance
     */
    distance(d: Date | Datetime, align: string): number;

    // Plugin methods - unix
    /**
     * Gets the Unix timestamp (seconds since epoch)
     * @returns {number} The Unix timestamp
     */
    unix(): number;

    /**
     * Sets the date from a Unix timestamp
     * @param {number} timestamp - The Unix timestamp
     * @returns {this} The current instance
     */
    fromUnix(timestamp: number): this;

    // Plugin methods - transform
    /**
     * Converts to a native Date object
     * @returns {Date} The Date object
     */
    toDate(): Date;

    /**
     * Converts to a date string
     * @returns {string} The date string
     */
    toDateString(): string;

    /**
     * Converts to an ISO string
     * @returns {string} The ISO string
     */
    toISOString(): string;

    /**
     * Converts to a JSON string
     * @returns {string} The JSON string
     */
    toJSON(): string;

    /**
     * Converts to a GMT string
     * @returns {string} The GMT string
     */
    toGMTString(): string;

    /**
     * Converts to a locale date string
     * @param {string | string[]} locales - The locales to use
     * @param {Intl.DateTimeFormatOptions} options - The formatting options
     * @returns {string} The locale date string
     */
    toLocaleDateString(locales?: string | string[], options?: Intl.DateTimeFormatOptions): string;

    /**
     * Converts to a locale string
     * @param {string | string[]} locales - The locales to use
     * @param {Intl.DateTimeFormatOptions} options - The formatting options
     * @returns {string} The locale string
     */
    toLocaleString(locales?: string | string[], options?: Intl.DateTimeFormatOptions): string;

    /**
     * Converts to a locale time string
     * @param {string | string[]} locales - The locales to use
     * @param {Intl.DateTimeFormatOptions} options - The formatting options
     * @returns {string} The locale time string
     */
    toLocaleTimeString(locales?: string | string[], options?: Intl.DateTimeFormatOptions): string;

    /**
     * Converts to a time string
     * @returns {string} The time string
     */
    toTimeString(): string;

    /**
     * Converts to a UTC string
     * @returns {string} The UTC string
     */
    toUTCString(): string;

    // Plugin methods - moon
    /**
     * Gets the moon phase (0-1)
     * @returns {number} The moon phase
     */
    moonPhase(): number;

    /**
     * Gets the moon illumination (0-1)
     * @returns {number} The moon illumination
     */
    moonIllumination(): number;

    /**
     * Gets the moon phase angle in degrees
     * @returns {number} The moon phase angle
     */
    moonPhaseAngle(): number;

    /**
     * Gets an emoji representing the moon phase
     * @returns {string} The moon phase emoji
     */
    moonPhaseEmoji(): string;

    /**
     * Gets the name of the moon phase
     * @returns {string} The moon phase name
     */
    moonPhaseName(): string;

    // Plugin methods - time-lapse
    /**
     * Gets a human-readable time lapse between two dates
     * @param {Date | Datetime} date - The date to compare with
     * @param {any} options - Options for formatting
     * @returns {string} The time lapse string
     */
    timeLapse(date: Date | Datetime, options?: any): string;
  }

  /**
   * Creates a new Datetime instance
   * @param {...any} args - Arguments to pass to the Date constructor
   * @returns {Datetime} A new Datetime instance
   */
  export function datetime(...args: any[]): Datetime;
}
