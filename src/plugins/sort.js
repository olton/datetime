import {DEFAULT_FORMAT} from "../helpers/consts.js";
import {Datetime, datetime} from "../core/class.js";
import {not} from "../helpers/not.js";

Object.assign(Datetime, {
    sort(arr, opt){
        let result, _arr;
        const o = {};

        if (typeof opt === "string" || typeof opt !== "object" || not(opt)) {
            o.format = DEFAULT_FORMAT;
            o.dir = opt && opt.toUpperCase() === "DESC" ? "DESC" : "ASC";
            o.returnAs = "datetime";
        } else {
            o.format = opt.format || DEFAULT_FORMAT;
            o.dir = (opt.dir || "ASC").toUpperCase();
            o.returnAs = opt.format ? "string" : opt.returnAs || "datetime";
        }

        _arr =  arr.map((el) => datetime(el)).sort((a, b) => a.valueOf() - b.valueOf());

        if (o.dir === "DESC") {
            _arr.reverse();
        }

        switch (o.returnAs) {
            case "string":
                result = _arr.map((el) => el.format(o.format));
                break;
            case "date":
                result = _arr.map((el) => el.val());
                break;

            default: result = _arr;
        }

        return result;
    }
})
