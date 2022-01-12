import {Datetime} from "../core/class.js";

const ageMixin = {
    age(d) {
        let old = new Date(Number(d)),
            now = new Date(),
            val = now - old,
            res

        let seconds = Math.floor(val / 1000),
            minutes = Math.floor(seconds / 60),
            hours = Math.floor(minutes / 60),
            days = Math.floor(hours / 24),
            months = Math.floor(days / 30),
            years = Math.floor(months / 12)

        if (years >= 1) res =  `${years} year`
        if (months >= 1 && years < 1) res =  `${months} mon`
        if (days >= 1 && days <= 30) res =  `${days} days`
        if (hours && hours < 24) res =  `${hours} hour`
        if (minutes && (minutes >= 40 && minutes < 60)) res =  "less a hour"
        if (minutes && minutes < 40) res =  `${minutes} min`;
        if (seconds && seconds >= 30 && seconds < 60) res =  `${seconds} sec`
        if (seconds < 30) res =  `few sec`

        return res
    }
}

Object.assign(Datetime.prototype, ageMixin)