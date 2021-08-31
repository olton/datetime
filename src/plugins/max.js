import {Datetime, datetime} from "../";

Object.assign(Datetime, {
    max(){
        let arr = [].slice.call(arguments);
        return arr.map((el) => datetime(el)).sort((a, b) => b.time() - a.time())[0];
    }
});

Object.assign(Datetime.prototype, {
    max(){
        return Datetime.max.apply(this, [this].concat([].slice.call(arguments)));
    }
});
