import {DEFAULT_FORMAT} from "../helpers/consts";
import {Datetime} from "../core/class";

const fnFormat = Datetime.prototype.format;

Object.assign(Datetime.prototype, {
    utcOffset(){
        return this.value.getTimezoneOffset();
    },

    timezone(){
        return this.toTimeString().replace(/.+GMT([+-])(\d{2})(\d{2}).+/, '$1$2:$3');
    },

    timezoneName(){
        return this.toTimeString().replace(/.+\((.+?)\)$/, '$1');
    },

    format(format, locale){
        format = format || DEFAULT_FORMAT;

        const matches = {
            Z: this.utcMode ? "Z" : this.timezone(),
            ZZ: this.timezone().replace(":", ""),
            ZZZ: "[GMT]"+this.timezone(),
            z: this.timezoneName()
        }

        let result = format.replace(/(\[[^\]]+])|Z{1,3}|z/g, (match, $1) => $1 || matches[match])

        return fnFormat.bind(this)(result, locale)
    }
})
