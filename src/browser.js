import {datetime, Datetime} from "./core/class.js";
import "./plugins/buddhist.js"
import "./plugins/calendar.js"
import "./plugins/century.js"
import "./plugins/compare.js"
import "./plugins/dayofyear.js"
import "./plugins/daysin.js"
import "./plugins/decade.js"
import "./plugins/from.js"
import "./plugins/hour12.js"
import "./plugins/isleapyear.js"
import "./plugins/iso.js"
import "./plugins/max.js"
import "./plugins/min.js"
import "./plugins/quarter.js"
import "./plugins/sort.js"
import "./plugins/strftime.js"
import "./plugins/timezone.js"
import "./plugins/today.js"
import "./plugins/tomorrow.js"
import "./plugins/transform.js"
import "./plugins/unix.js"
import "./plugins/weeknumber.js"
import "./plugins/yesterday.js"
import "./plugins/time-lapse.js"
import "./plugins/parse-time.js"

import "./i18n/ru.js"
import "./i18n/de.js"
import "./i18n/ua.js"

globalThis.Datetime = Datetime
globalThis.datetime = datetime
if (!globalThis.date) {
    globalThis.date = datetime
}