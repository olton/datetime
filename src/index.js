import {datetime, Datetime} from "./core/class.js"
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

const version = "3.0.4"
const build_time = "08.05.2024, 14:05:56"

const info = () => {
    console.info(`%c Datetime Library %c v${version} %c ${build_time} `, "color: #ffffff; font-weight: bold; background: #003152", "color: white; background: darkgreen", "color: white; background: #0080fe;")
}

export {
    Datetime,
    datetime,
    info
}