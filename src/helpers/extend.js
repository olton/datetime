export const extend = function(where){
    let options, name,
        length = arguments.length;

    for (let i = 1; i < length; i++ ) {
        if ( ( options = arguments[ i ] ) != null ) {
            for ( name in options ) {
                if (Object.prototype.hasOwnProperty.call(options, name))
                    where[ name ] = options[ name ];
            }
        }
    }

    return where;
}