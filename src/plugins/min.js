import {Datetime, datetime} from "../";


Object.assign(Datetime, {
    min(){
        let arr = [].slice.call(arguments);
        return arr.map((el) => datetime(el)).sort((a, b) => a.time() - b.time())[0];
    }
});

Object.assign(Datetime.prototype, {
    min(){
        return Datetime.min.apply(this, [this].concat([].slice.call(arguments)));
    }
})
