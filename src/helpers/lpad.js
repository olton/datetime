export const lpad = function(str, pad, length){
    let _str = ""+str;
    if (length && _str.length >= length) {
        return _str;
    }
    return Array((length + 1) - _str.length).join(pad) + _str;
}