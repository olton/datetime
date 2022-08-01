import {datetime, Datetime} from "./core/class";
import "./plugins/buddhist"
import "./plugins/calendar"
import "./plugins/century"
import "./plugins/compare"
import "./plugins/dayofyear"
import "./plugins/daysin"
import "./plugins/decade"
import "./plugins/from"
import "./plugins/hour12"
import "./plugins/isleapyear"
import "./plugins/iso"
import "./plugins/max"
import "./plugins/min"
import "./plugins/quarter"
import "./plugins/sort"
import "./plugins/strftime"
import "./plugins/timezone"
import "./plugins/today"
import "./plugins/tomorrow"
import "./plugins/transform"
import "./plugins/unix"
import "./plugins/weeknumber"
import "./plugins/yesterday"
import "./plugins/time-lapse"
import "./plugins/parse-time.js"

import "./i18n/ru"
import "./i18n/de"
import "./i18n/ua"

globalThis.Datetime = Datetime
globalThis.datetime = datetime
if (!globalThis.date) {
    globalThis.date = datetime
}